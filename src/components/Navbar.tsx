"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
    const { t, language, setLanguage } = useLanguage();
    const isAccessPage = pathname === "/access";

    const links = [
        { href: "/", label: t.nav.publications },
        { href: "/topics", label: t.nav.topics },
        { href: "/authors", label: t.nav.authors },
        { href: "/guidelines", label: t.nav.guidelines },
        { href: "/subscribe", label: t.nav.subscribe },
        { href: "/about", label: t.nav.about },
    ];

    const displayLinks = isAccessPage
        ? [
            { href: "/about", label: t.nav.about },
            { href: "/contact", label: t.nav.contact }
        ]
        : links;

    const toggleLanguage = () => {
        setLanguage(language === "nl" ? "en" : "nl");
    };

    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const previousOverflow = document.body.style.overflow;
        const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const focusableSelector = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])";
        const getFocusableItems = () => Array.from(mobileMenuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);

        document.body.style.overflow = "hidden";
        getFocusableItems()[0]?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMobileMenuOpen(false);
                mobileMenuButtonRef.current?.focus();
                return;
            }

            if (event.key !== "Tab") return;

            const focusableItems = getFocusableItems();
            if (focusableItems.length === 0) return;

            const firstItem = focusableItems[0];
            const lastItem = focusableItems[focusableItems.length - 1];

            if (event.shiftKey && document.activeElement === firstItem) {
                event.preventDefault();
                lastItem.focus();
            } else if (!event.shiftKey && document.activeElement === lastItem) {
                event.preventDefault();
                firstItem.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
            previouslyFocused?.focus();
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50"
                style={{ height: "44px" }}
            >
                <div className="container h-full flex items-center justify-between">
                    <Link href="/" aria-label="Medical AI home" className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-black/90 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary transition-opacity z-50 relative">
                        <Image
                            src="/images/logo-medical-ai.png"
                            alt=""
                            width={72}
                            height={72}
                            priority
                            className="h-9 w-9 object-contain"
                        />
                        <span className="leading-none">
                            <span className="text-brand-dark">Medical </span>
                            <span className="brand-flow-text font-extrabold">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
                        {displayLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={pathname === link.href ? "page" : undefined}
                                className="text-[12px] font-normal tracking-wide text-gray-600 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary transition-colors h-full flex items-center"
                                style={{
                                    color: pathname === link.href ? "#000000" : undefined,
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            aria-label={language === "nl" ? "Switch language to English" : "Schakel taal naar Nederlands"}
                            className="text-[12px] font-medium text-gray-600 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary transition-colors flex items-center gap-1 uppercase"
                        >
                            <Globe size={14} />
                            {language}
                        </button>

                        {!isAccessPage && (
                            <Link href="/login" className="hidden lg:block text-[12px] font-normal text-gray-500 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary transition-colors">
                                {t.nav.login}
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            ref={mobileMenuButtonRef}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-controls="mobile-navigation"
                            aria-expanded={isMobileMenuOpen}
                            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            className="lg:hidden p-1 text-gray-600 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary transition-colors z-50 relative"
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
                        id="mobile-navigation"
                        ref={mobileMenuRef}
                        role="navigation"
                        aria-label="Mobile navigation"
                        className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white px-6 pt-20 lg:hidden"
                    >
                        <div className="flex flex-col gap-6 mt-8">
                            {displayLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={pathname === link.href ? "page" : undefined}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-medium text-slate-900 border-b border-gray-100 pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {!isAccessPage && (
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-medium text-slate-500 border-b border-gray-100 pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
                                >
                                    {t.nav.login}
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
