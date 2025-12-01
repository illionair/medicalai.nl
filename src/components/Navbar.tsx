"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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
    const isAccessPage = pathname === "/access";

    const displayLinks = isAccessPage
        ? [
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" }
        ]
        : links;

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50"
            style={{ height: "44px" }}
        >
            <div className="container h-full flex items-center justify-between max-w-[1024px] mx-auto px-4">
                <Link href="/" className="text-[14px] font-semibold tracking-tight flex items-center gap-2 text-black/90 hover:opacity-70 transition-opacity">
                    Medical AI
                </Link>

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

                {!isAccessPage && (
                    <Link href="/admin" className="text-[12px] font-normal text-gray-500 hover:text-black transition-colors">
                        Login
                    </Link>
                )}
            </div>
        </motion.nav>
    );
}
