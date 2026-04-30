"use client";

import Link from "next/link";
import { useResumeStore } from "@/store/useResumeStore";

export default function ResultsPage() {
    const result = useResumeStore((s) => s.result);

    if (!result) return null;

    return (
        <div className="min-h-screen bg-slate-50 text-black p-10">
            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between mb-8">
                    <h1 className="text-4xl font-bold text-slate-700">Results</h1>

                    <Link
                        href="/editor"
                        className="bg-indigo-600 text-white px-5 py-3 rounded-xl"
                    >
                        Edit Resume
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white p-6 rounded-2xl">
                        <p className='text-blue-300'>ATS Score</p>
                        <h2 className="text-5xl text-green-400 font-bold">{result.score}%</h2>
                    </div>

                    <div className="bg-white p-6 rounded-2xl">
                        <p>Matched</p>
                        <p className='text-green-500'>{result.matched_keywords.join(", ")}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl">
                        <p>Missing</p>
                        <p className='text-red-500'>{result.missing_keywords.join(", ")}</p>
                    </div>

                </div>

            </div>
        </div>
    );
}