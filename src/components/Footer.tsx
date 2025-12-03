"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Linkedin } from "lucide-react";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand & Summary */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Medical AI</h3>
                        <p className="text-sm leading-relaxed max-w-xs">
                            {t.footer.about_summary}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">{t.footer.quick_links}</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/#latest" className="hover:text-white transition-colors">
                                    {t.nav.publications}
                                </Link>
                            </li>
                            <li>
                                <Link href="/topics" className="hover:text-white transition-colors">
                                    {t.nav.topics}
                                </Link>
                            </li>
                            <li>
                                <Link href="/guidelines" className="hover:text-white transition-colors">
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
                            className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors group"
                        >
                            <span className="p-2 rounded-full bg-slate-800 group-hover:bg-blue-600 transition-colors">
                                <Linkedin size={18} />
                            </span>
                            LinkedIn
                        </a>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>{t.footer.legal}</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="hover:text-slate-300 cursor-pointer">{t.footer.privacy}</span>
                        <span className="hover:text-slate-300 cursor-pointer">{t.footer.terms}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
