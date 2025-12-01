"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sendContactEmail } from "../actions";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

    async function handleSubmit(formData: FormData) {
        setStatus("sending");
        await sendContactEmail(formData);
        setStatus("success");
    }

    return (
        <div className="container section-padding min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
                    <p className="text-gray-500 text-lg">
                        Have questions or suggestions? We'd love to hear from you.
                    </p>
                </div>

                {status === "success" ? (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-green-50 text-green-800 p-8 rounded-2xl text-center border border-green-100"
                    >
                        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                        <p>Thank you for reaching out. We'll get back to you shortly.</p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="mt-6 text-sm font-medium underline hover:text-green-900"
                        >
                            Send another message
                        </button>
                    </motion.div>
                ) : (
                    <form action={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                placeholder="How can we help?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea
                                name="message"
                                required
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none"
                                placeholder="Your message..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="w-full py-4 bg-black text-white rounded-xl font-medium text-lg hover:opacity-80 transition-opacity disabled:opacity-50"
                        >
                            {status === "sending" ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
