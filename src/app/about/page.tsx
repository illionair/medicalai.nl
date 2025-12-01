"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="container section-padding min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
            >
                <h1 className="text-4xl font-bold tracking-tight mb-8">About Medical AI</h1>

                <div className="prose prose-lg text-gray-600 space-y-6">
                    <p>
                        Welcome to <strong>Medical AI</strong>, a dedicated platform exploring the transformative potential of artificial intelligence in healthcare. Our mission is to bridge the gap between cutting-edge technological advancements and clinical practice.
                    </p>

                    <p>
                        We curate, analyze, and summarize the latest research papers, guidelines, and ethical discussions surrounding AI in medicine. Whether you are a clinician, researcher, or student, our goal is to keep you informed about how AI is reshaping diagnostics, prognostics, and patient care.
                    </p>

                    <h3 className="text-2xl font-semibold text-black mt-8 mb-4">Our Focus Areas</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Diagnostic Research:</strong> AI models for image analysis and early detection.</li>
                        <li><strong>Prediction Models:</strong> Risk stratification and outcome forecasting.</li>
                        <li><strong>Methodology:</strong> Best practices for developing and validating medical AI.</li>
                        <li><strong>Ethics & Guidelines:</strong> Navigating the regulatory and moral landscape of AI adoption.</li>
                    </ul>

                    <p className="mt-8">
                        Join us as we navigate the future of medicine, one algorithm at a time.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
