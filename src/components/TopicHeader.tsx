"use client";

import { motion } from "framer-motion";

interface TopicHeaderProps {
    title: string;
    description: string;
    color: string; // e.g., "bg-blue-500"
}

export default function TopicHeader({ title, description, color }: TopicHeaderProps) {
    // Map color classes to hex/variables for dynamic styling if needed, 
    // or just use the passed class.
    // Assuming 'color' is a tailwind class like "text-blue-600" or "bg-blue-500"

    // Let's create a mapping for "Nano Banner" style gradients based on the topic
    const gradients: Record<string, string> = {
        "Predictie": "from-blue-500 to-cyan-400",
        "Diagnostiek": "from-purple-500 to-pink-400",
        "Methodisch": "from-green-500 to-emerald-400",
        "Ethiek": "from-orange-500 to-amber-400",
        "default": "from-gray-800 to-gray-600"
    };

    const gradient = gradients[title] || gradients["default"];

    return (
        <div className="relative w-full min-h-[300px] overflow-hidden rounded-3xl mb-12 flex flex-col justify-center">
            {/* Background with Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />

            {/* Abstract Shapes/Blur for "Nano" effect */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center p-8 text-white z-10">
                <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs md:text-sm font-bold tracking-widest uppercase mb-4 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10"
                >
                    Topic
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-base md:text-xl text-white/90 max-w-2xl font-light leading-relaxed"
                >
                    {description}
                </motion.p>
            </div>
        </div>
    );
}
