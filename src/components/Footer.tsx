"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Linkedin } from "lucide-react";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-brand-dark text-brand-white/80 py-12 border-t border-brand-primary/30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand & Summary */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Medical AI</h3>
                        <p className="text-sm leading-relaxed max-w-xs text-gray-400">
                            {t.footer.about_summary}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">{t.footer.quick_links}</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/#latest" className="text-gray-400 hover:text-white transition-colors">
                                    {t.nav.publications}
                                </Link>
                            </li>
                            <li>
                                <Link href="/topics" className="text-gray-400 hover:text-white transition-colors">
                                    {t.nav.topics}
                                </Link>
                            </li>
                            <li>
                                <Link href="/guidelines" className="text-gray-400 hover:text-white transition-colors">
                                    {t.nav.guidelines}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social & Contact */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Connect</h3>
                        <a
                            href="https://www.linkedin.com/company/110109298/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                        >
                            <span className="p-2 rounded-full bg-brand-primary group-hover:bg-brand-secondary transition-colors text-white">
                                <Linkedin size={18} />
                            </span>
                            LinkedIn
                        </a>
                    </div>
                </div>

                <div className="border-t border-brand-primary/30 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>{t.footer.legal}</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white cursor-pointer transition-colors">{t.footer.privacy}</Link>
                        <Link href="/terms" className="hover:text-white cursor-pointer transition-colors">{t.footer.terms}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
