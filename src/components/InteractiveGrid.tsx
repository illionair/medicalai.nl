"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function InteractiveGrid() {
    const [columns, setColumns] = useState(0);
    const [rows, setRows] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const updateGrid = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                const height = containerRef.current.offsetHeight;
                const blockSize = 50; // Size of each block
                setColumns(Math.ceil(width / blockSize));
                setRows(Math.ceil(height / blockSize));
            }
        };

        updateGrid();
        window.addEventListener("resize", updateGrid);
        return () => window.removeEventListener("resize", updateGrid);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden bg-black"
            onMouseMove={handleMouseMove}
        >
            {/* Vibrant Background that gets revealed */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-100" />

            {/* Grid of Blocks */}
            <div
                className="absolute inset-0 grid gap-[1px] bg-black/20"
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                }}
            >
                {Array.from({ length: columns * rows }).map((_, i) => (
                    <Block
                        key={i}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        index={i}
                        columns={columns}
                    />
                ))}
            </div>

            {/* Overlay Gradient to darken edges */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-80 pointer-events-none" />
        </div>
    );
}

function Block({ mouseX, mouseY, index, columns }: { mouseX: any, mouseY: any, index: number, columns: number }) {
    const blockRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (blockRef.current) {
            const rect = blockRef.current.getBoundingClientRect();
            // We need relative position within the container, but rect is viewport. 
            // Simplified: we can calculate center based on index.
            // Actually, let's just use the rect on mount/resize if possible, 
            // but for performance in this specific setup, let's rely on the fact that 
            // we know the grid structure.
            // However, getting the exact center of the block is best done via rect.
            // To avoid heavy layout thrashing, we'll just do it once or use a simpler distance check.
            setPosition({
                x: blockRef.current.offsetLeft + blockRef.current.offsetWidth / 2,
                y: blockRef.current.offsetTop + blockRef.current.offsetHeight / 2
            });
        }
    }, [columns]); // Recalculate if grid changes

    // Transform based on distance
    const distance = useTransform<number, number>([mouseX, mouseY], ([x, y]) => {
        const dx = x - position.x;
        const dy = y - position.y;
        return Math.sqrt(dx * dx + dy * dy);
    });

    // Scale down when mouse is close (reveal background)
    // Distance 0 -> Scale 0.2
    // Distance 300 -> Scale 1
    const scale = useTransform(distance, [0, 300], [0.2, 1]);
    const opacity = useTransform(distance, [0, 400], [0, 1]);

    // Add a spring for smooth animation
    const springScale = useSpring(scale, { stiffness: 150, damping: 20 });
    const springOpacity = useSpring(opacity, { stiffness: 150, damping: 20 });

    return (
        <motion.div
            ref={blockRef}
            style={{
                scale: springScale,
                opacity: springOpacity,
            }}
            className="bg-gray-950 w-full h-full border border-gray-900/30 relative z-10"
        />
    );
}
