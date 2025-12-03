"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
    { href: "/", label: "Publications" },
    { href: "/topics", label: "Topics" },
    { href: "/authors", label: "Authors" },
    { href: "/guidelines", label: "Guidelines" },
    { href: "/subscribe", label: "Subscribe" },
    { href: "/about", label: "About" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isAccessPage = pathname === "/access";

    const displayLinks = isAccessPage
        ? [
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" }
        ]
        : links;

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50"
                style={{ height: "44px" }}
            >
                <div className="container h-full flex items-center justify-between max-w-[1024px] mx-auto px-4">
                    <Link href="/" className="text-[14px] font-semibold tracking-tight flex items-center gap-2 text-black/90 hover:opacity-70 transition-opacity z-50 relative">
                        Medical AI
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 h-full">
                        {displayLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[12px] font-normal tracking-wide text-gray-600 hover:text-black transition-colors h-full flex items-center"
                                style={{
                                    color: pathname === link.href ? "#000000" : undefined,
                                    fontFamily: '"SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Apple Legacy Chevron", "Helvetica Neue", "Helvetica", "Arial", sans-serif'
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {!isAccessPage && (
                            <Link href="/admin" className="hidden md:block text-[12px] font-normal text-gray-500 hover:text-black transition-colors">
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-1 text-gray-600 hover:text-black transition-colors z-50 relative"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden flex flex-col"
                    >
                        <div className="flex flex-col gap-6 mt-8">
                            {displayLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-medium text-slate-900 border-b border-gray-100 pb-4"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {!isAccessPage && (
                                <Link
                                    href="/admin"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-medium text-slate-500 border-b border-gray-100 pb-4"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
