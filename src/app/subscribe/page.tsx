"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SubscribePage() {
    const [status, setStatus] = useState<"idle" | "subscribed">("idle");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("subscribed");
        // In a real app, send to API
    }

    return (
        <div className="container section-padding min-h-screen flex items-center justify-center bg-slate-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white text-brand-dark p-10 rounded-3xl text-center shadow-xl border border-brand-primary/10"
            >
                {status === "subscribed" ? (
                    <div>
                        <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-brand-dark">You're Subscribed!</h2>
                        <p className="text-slate-500">Thanks for joining our newsletter.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-2 text-brand-dark">Stay Updated</h2>
                        <p className="text-slate-500 mb-8">
                            Get the latest medical AI research delivered to your inbox weekly.
                        </p>

                        <div className="space-y-4">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-brand-secondary text-white rounded-xl font-bold hover:bg-brand-primary transition-colors shadow-lg shadow-brand-secondary/20"
                            >
                                Subscribe
                            </button>
                        </div>
                        <p className="text-xs text-slate-400 mt-6">
                            No spam, unsubscribe anytime.
                        </p>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
