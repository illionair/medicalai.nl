"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { verifySiteAccess } from "../actions";
import InteractiveGrid from "@/components/InteractiveGrid";
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
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4 relative overflow-hidden">
            {/* Background */}
            <InteractiveGrid />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-sm relative z-10"
            >
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
                    >
                        <Lock size={20} className="text-white/70" />
                    </motion.div>
                    <h1 className="text-2xl font-light tracking-[0.2em] uppercase mb-2 text-white/90">Restricted Access</h1>
                    <p className="text-white/40 text-sm tracking-wide">Project Medical AI • 2025</p>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <input
                            type="password"
                            name="code"
                            placeholder="ENTER PROTOCOL CODE"
                            className="w-full px-6 py-4 rounded-none bg-transparent border-b border-white/20 focus:outline-none focus:border-white/80 transition-all text-center text-xl tracking-[0.3em] placeholder:text-white/20 placeholder:tracking-normal text-white"
                            required
                            autoComplete="off"
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-500 group-focus-within:w-full" />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-xs text-center tracking-widest uppercase"
                        >
                            {error}
                        </motion.p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-light tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm"
                    >
                        Initialize
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
