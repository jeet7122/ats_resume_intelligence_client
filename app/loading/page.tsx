"use client";

import { motion } from "framer-motion";

export default function LoadingPage() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="max-w-xl text-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-8"
                />

                <h1 className="text-4xl font-bold text-slate-900 mb-4">
                    Analyzing Your Resume
                </h1>

                <p className="text-slate-600 text-lg">
                    Parsing PDF, matching keywords, querying AI, generating improvements...
                </p>

                <div className="mt-8 space-y-2 text-sm text-slate-500">
                    <p>✓ Resume parsed</p>
                    <p>✓ ATS score calculating</p>
                    <p>⏳ AI optimization in progress</p>
                </div>
            </div>
        </div>
    );
}