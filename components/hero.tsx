"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function Hero() {
    return (
        <section className="min-h-screen bg-gradient-to-b from-white to-slate-50 px-6">
            <div className="max-w-7xl mx-auto pt-24 pb-16 grid md:grid-cols-2 gap-14 items-center">

                {/* LEFT */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
                    >
                        <Sparkles size={16} />
                        AI Resume Intelligence Platform
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold leading-tight text-slate-900"
                    >
                        Beat ATS Filters. <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Land More Interviews.
            </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-lg text-slate-600 max-w-xl"
                    >
                        Upload your resume, compare it with any job description, discover missing keywords, and optimize instantly using AI.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 flex flex-wrap gap-4"
                    >
                        <Link
                            href="/upload"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-4 rounded-xl font-medium shadow-lg"
                        >
                            Analyze Resume
                        </Link>

                        <button className="border border-slate-300 px-7 py-4 rounded-xl font-medium text-slate-700 hover:bg-white">
                            Watch Demo
                        </button>
                    </motion.div>

                    <div className="mt-8 space-y-3">
                        {[
                            "ATS Match Score in seconds",
                            "AI Bullet Point Rewrites",
                            "Export Optimized PDF Resume",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3 text-slate-600">
                                <CheckCircle2 className="text-green-500" size={18} />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 }}
                    className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-slate-800">
                            Resume Analytics
                        </h3>
                        <span className="text-green-600 font-semibold">92%</span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-3 mb-6">
                        <div className="bg-indigo-600 h-3 rounded-full w-[92%]" />
                    </div>

                    <div className="grid gap-4">
                        <div className="p-4 rounded-2xl bg-slate-50 border">
                            <p className="text-sm text-slate-500">Matched Skills</p>
                            <p className="font-semibold text-green-500 mt-1">Java, Spring Boot, AWS</p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border">
                            <p className="text-sm text-slate-500">Missing Keywords</p>
                            <p className="font-semibold mt-1 text-amber-600">
                                React, Docker, CI/CD
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border">
                            <p className="text-sm text-slate-500">AI Suggestion</p>
                            <p className="font-semibold text-slate-700 mt-1">
                                Improve summary with backend scalability keywords.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}