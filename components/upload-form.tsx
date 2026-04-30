"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";


export default function UploadForm(){
    const [file, setFile] = useState<File | null>(null);
    const [jd, setJd] = useState("");

    const router = useRouter();

    const setLoading = useResumeStore((s) => s.setLoading);
    const setResult = useResumeStore((s) => s.setResult);

    const submit = async () => {
        const formData = new FormData();

        if (file) formData.append("resume", file);
        formData.append("jd", jd);

        setLoading(true);
        router.push("/loading");

        const res = await fetch("http://localhost:8000/analyze", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        console.log(data);

        setResult({
            score: data.scan_result.score,
            matched_keywords: data.scan_result.matched_keywords,
            missing_keywords: data.scan_result.missing_keywords,
            suggestions: data.optimization_result.suggestions,
            improved_bullets: data.optimization_result.improved_bullets,
            summary: data.optimization_result.summary,
        });

        setLoading(false);

        router.push("/results");
    };


    return(
        <div className="max-w-3xl mx-auto py-20 px-6">
            <h1 className="text-4xl font-bold mb-8">Upload Resume</h1>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-6"
            />

            <textarea
                placeholder="Paste Job Description..."
                className="w-full h-60 bg-zinc-900 p-4 rounded-xl mb-6"
                onChange={(e) => setJd(e.target.value)}
            />

            <button
                onClick={submit}
                className="bg-indigo-600 px-6 py-3 rounded-xl"
            >
                Analyze Resume
            </button>
        </div>
    );
}