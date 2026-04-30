"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/actions";

export default function LoginPage() {
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setError("");
        const result = await loginUser(formData);
        if (result?.error) {
            setError(result.error);
            return;
        }
        const next = new URLSearchParams(window.location.search).get("next") || "/";
        router.push(next.startsWith("/") ? next : "/");
        router.refresh();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-black p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2 text-brand-dark">Inloggen</h1>
                    <p className="text-sm text-gray-500">
                        Log in om artikelen te liken en te reageren.
                    </p>
                </div>

                <form action={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Naam"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-secondary transition-all"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mailadres"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-secondary transition-all"
                        required
                    />

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-brand-dark text-white font-bold hover:opacity-90 transition-opacity"
                    >
                        Inloggen
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-gray-400">
                    We gebruiken je e-mailadres alleen voor je profiel op Medical AI.
                </p>
            </motion.div>
        </div>
    );
}
