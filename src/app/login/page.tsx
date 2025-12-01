"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { verifyAdminLogin } from "../actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        const result = await verifyAdminLogin(formData);
        if (result?.error) {
            setError(result.error);
        } else if (result?.success) {
            router.push("/admin");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
                <div className="text-center mb-8">
                    <h1 className="text-xl font-semibold mb-1">Admin Login</h1>
                    <p className="text-sm text-gray-400">Secure access only</p>
                </div>

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-black transition-all"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-black text-white font-medium hover:opacity-80 transition-opacity"
                    >
                        Login
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
