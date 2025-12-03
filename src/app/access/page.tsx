"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { verifySiteAccess } from "../actions";
import { Lock } from "lucide-react";

export default function AccessPage() {
    const [error, setError] = useState("");

    async function handleSubmit(formData: FormData) {
        const result = await verifySiteAccess(formData);
        if (result?.error) {
            setError("Access Denied");
        }
    }

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-white">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/hand-robot.png"
                    alt="Medical AI Future"
                    className="w-full h-full object-cover object-center"
                />
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/90"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 container section-padding flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-sm"
                >
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/60 border border-white/40 mb-6 backdrop-blur-md shadow-sm"
                        >
                            <Lock size={24} className="text-slate-600" />
                        </motion.div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Restricted Access</h1>
                        <p className="text-slate-500 font-medium">Project Medical AI • 2025</p>
                    </div>

                    <form action={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <input
                                type="password"
                                name="code"
                                placeholder="ENTER PROTOCOL CODE"
                                className="w-full px-6 py-4 rounded-xl bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center text-xl tracking-[0.2em] placeholder:text-slate-400 placeholder:tracking-normal text-slate-800 backdrop-blur-sm shadow-sm"
                                required
                                autoComplete="off"
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-sm font-medium text-center bg-red-50 py-2 rounded-lg border border-red-100"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold tracking-wide uppercase hover:bg-blue-700 hover:scale-[1.02] transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20"
                        >
                            Initialize
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
