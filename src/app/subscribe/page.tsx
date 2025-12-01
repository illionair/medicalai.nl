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
        <div className="container section-padding min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-gray-900 text-white p-10 rounded-3xl text-center"
            >
                {status === "subscribed" ? (
                    <div>
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">You're Subscribed!</h2>
                        <p className="text-gray-400">Thanks for joining our newsletter.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
                        <p className="text-gray-400 mb-8">
                            Get the latest medical AI research delivered to your inbox weekly.
                        </p>

                        <div className="space-y-4">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-colors"
                            >
                                Subscribe
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-6">
                            No spam, unsubscribe anytime.
                        </p>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
