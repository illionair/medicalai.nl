"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { requestMagicLink } from "@/app/actions";

export default function LoginPage() {
    const [error, setError] = useState("");
    const [sentTo, setSentTo] = useState("");

    async function handleSubmit(formData: FormData) {
        setError("");
        formData.set("next", new URLSearchParams(window.location.search).get("next") || "/");
        const result = await requestMagicLink(formData);

        if (result?.error) {
            setError(result.error);
            return;
        }

        setSentTo(String(formData.get("email") || ""));
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
                        Vul uw naam en e-mailadres in. We sturen u binnen enkele ogenblikken een e-mail met uw persoonlijke inloglink.
                    </p>
                </div>

                {sentTo ? (
                    <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5 text-center">
                        <h2 className="font-bold text-emerald-900 mb-2">Check je inbox</h2>
                        <p className="text-sm text-emerald-800">
                            We hebben een loginlink gestuurd naar {sentTo}. De link verloopt over 15 minuten.
                        </p>
                    </div>
                ) : (
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
                            Stuur loginlink
                        </button>
                    </form>
                )}

                <p className="mt-6 text-center text-xs text-gray-400">
                    Geen wachtwoord nodig. Je mailbox bevestigt je identiteit.
                </p>
            </motion.div>
        </div>
    );
}
