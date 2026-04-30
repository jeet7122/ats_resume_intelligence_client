"use client";

import { useResumeStore } from "@/store/useResumeStore";

export default function EditorPage() {
    const result = useResumeStore((s) => s.result);

    if (!result) return null;

    return (
        <div className="grid md:grid-cols-2 bg-white text-black min-h-screen">

            <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Optimized Summary</h2>

                <textarea
                    defaultValue={result.summary}
                    className="w-full h-[80vh] border p-4 rounded-xl"
                />
            </div>

            <div className="p-8 bg-slate-50">
                <h2 className="text-2xl font-bold mb-6">
                    AI Bullet Improvements
                </h2>

                <div className="space-y-4">
                    {result.improved_bullets.map((item, i) => (
                        <div key={i} className="bg-white p-5 rounded-xl">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}