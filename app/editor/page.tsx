"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";

export default function EditorPage() {
    const result = useResumeStore((s) => s.result);
    const storedResume = useResumeStore((s) => s.resumeText);

    const [resume, setResume] = useState(storedResume);

    if (!result) return null;

    const applySuggestion = (text: string) => {
        setResume((prev) => prev + "\n\n" + text);
    };

    return (
        <div className="grid md:grid-cols-2 min-h-screen bg-white text-black">

            {/* LEFT SIDE */}
            <div className="p-8 border-r">
                <h2 className="text-2xl font-bold mb-6">
                    Full Resume Editor
                </h2>

                <textarea
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    className="w-full h-[85vh] border rounded-xl p-4 font-mono text-sm"
                />
            </div>

            {/* RIGHT SIDE */}
            <div className="p-8 bg-slate-50 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">
                    AI Improvements
                </h2>

                {/* Summary */}
                <div className="bg-white p-5 rounded-xl mb-6">
                    <h3 className="font-semibold mb-3">
                        Optimized Summary
                    </h3>

                    <p className="text-sm text-slate-700 mb-4">
                        {result.summary}
                    </p>

                    <button
                        onClick={() => applySuggestion(result.summary)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        Insert Summary
                    </button>
                </div>

                {/* Bullets */}
                <div className="space-y-4">
                    {result.improved_bullets.map((item, i) => (
                        <div key={i} className="bg-white p-5 rounded-xl shadow-sm">
                            <p className="mb-4">{item}</p>

                            <button
                                onClick={() => applySuggestion(item)}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                            >
                                Insert
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}