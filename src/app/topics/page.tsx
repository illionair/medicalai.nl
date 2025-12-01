"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const topics = [
    {
        title: "Predictie",
        description: "AI models for risk stratification and outcome forecasting.",
        color: "bg-blue-50 text-blue-700",
    },
    {
        title: "Diagnostiek",
        description: "Deep learning for medical imaging and early disease detection.",
        color: "bg-purple-50 text-purple-700",
    },
    {
        title: "Methodisch",
        description: "Best practices for validation, bias mitigation, and implementation.",
        color: "bg-green-50 text-green-700",
    },
    {
        title: "Ethiek",
        description: "Regulatory frameworks, patient privacy, and algorithmic fairness.",
        color: "bg-orange-50 text-orange-700",
    },
];

export default function TopicsPage() {
    return (
        <div className="container section-padding min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-4xl font-bold tracking-tight mb-4">Explore Topics</h1>
                <p className="text-gray-500 text-lg mb-12">
                    Deep dive into specific areas of medical artificial intelligence.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    {topics.map((topic, index) => (
                        <Link href={`/topics/${topic.title}`} key={topic.title}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                className={`p-8 rounded-3xl border border-gray-100 h-full transition-shadow hover:shadow-lg ${topic.color.replace("text", "bg").replace("50", "50/50")}`}
                            >
                                <h3 className={`text-2xl font-semibold mb-3 ${topic.color.split(" ")[1]}`}>
                                    {topic.title}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {topic.description}
                                </p>
                                <div className={`flex items-center gap-2 font-medium ${topic.color.split(" ")[1]}`}>
                                    View Articles <ArrowRight size={16} />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
