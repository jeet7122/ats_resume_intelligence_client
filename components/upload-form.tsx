"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";

export default function UploadForm() {
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [jd, setJd] = useState("");

    const setLoading = useResumeStore((s) => s.setLoading);
    const setResult = useResumeStore((s) => s.setResult);
    const setResumeText = useResumeStore((s) => s.setResumeText);
    const setSections = useResumeStore((s) => s.setSections);
    const resetAll = useResumeStore((s) => s.resetAll);

    const submit = async () => {
        if (!file || !jd.trim()) return;

        try {
            resetAll();
            setLoading(true);

            const formData = new FormData();
            formData.append("resume", file);
            formData.append("jd", jd);

            router.push("/loading");

            const res = await fetch("http://localhost:8000/analyze", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error("Failed to analyze resume");
            }

            // AI result
            setResult({
                score: data.scan_result.score,
                matched_keywords: data.scan_result.matched_keywords,
                missing_keywords: data.scan_result.missing_keywords,
                suggestions: data.optimization_result.suggestions,
                improved_bullets:
                data.optimization_result.improved_bullets,
                summary: data.optimization_result.summary,
            });

            // Raw text
            setResumeText(data.raw_resume_text || "");

            // Structured sections
            setSections(data.resume_sections);

            router.push("/results");
        } catch (error) {
            console.error(error);
            router.push("/upload");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-20 px-6">
            <h1 className="text-4xl font-bold mb-8">
                Upload Resume
            </h1>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setFile(e.target.files?.[0] || null)
                }
                className="mb-6 block"
            />

            <textarea
                placeholder="Paste Job Description..."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                className="w-full h-60 border rounded-xl p-4 mb-6"
            />

            <button
                onClick={submit}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
            >
                Analyze Resume
            </button>
        </div>
    );
}