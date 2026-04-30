"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditorPage() {
    const router = useRouter();

    const result = useResumeStore((s) => s.result);
    const editedSections = useResumeStore((s) => s.editedSections);
    const setEditedSections = useResumeStore((s) => s.setEditedSections);

    /**
     * IMPORTANT:
     * If store data does not exist, show fallback UI.
     * Do NOT auto redirect immediately.
     * Your old redirect logic was causing /editor to bounce away.
     */

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!result || !editedSections) {
        return (
            <div className="min-h-screen bg-white text-black flex items-center justify-center px-6">
                <div className="max-w-xl text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        No Resume Data Found
                    </h1>

                    <p className="text-slate-600 mb-8">
                        Please analyze your resume first before opening
                        the editor.
                    </p>

                    <button
                        onClick={() => router.push("/upload")}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
                    >
                        Go to Upload
                    </button>
                </div>
            </div>
        );
    }

    const updateSummary = (value: string) => {
        setEditedSections({
            ...editedSections,
            summary: value,
        });
    };

    const updateExperience = (index: number, value: string) => {
        const updated = [...editedSections.experience];
        updated[index] = value;

        setEditedSections({
            ...editedSections,
            experience: updated,
        });
    };

    const updateProjects = (index: number, value: string) => {
        const updated = [...editedSections.projects];
        updated[index] = value;

        setEditedSections({
            ...editedSections,
            projects: updated,
        });
    };

    const updateSkills = (value: string) => {
        setEditedSections({
            ...editedSections,
            skills: value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
        });
    };

    const updateEducation = (index: number, value: string) => {
        const updated = [...editedSections.education];
        updated[index] = value;

        setEditedSections({
            ...editedSections,
            education: updated,
        });
    };

    const replaceSummaryWithAI = () => {
        setEditedSections({
            ...editedSections,
            summary: result.summary,
        });
    };

    const addExperienceBullet = (text: string) => {
        setEditedSections({
            ...editedSections,
            experience: [...editedSections.experience, text],
        });
    };

    return (
        <div className="min-h-screen bg-white text-black grid lg:grid-cols-3">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 p-8 overflow-y-auto h-screen">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-10">
                        Resume Editor
                    </h1>

                    {/* Summary */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            Professional Summary
                        </h2>

                        <textarea
                            value={editedSections.summary}
                            onChange={(e) => updateSummary(e.target.value)}
                            className="w-full h-36 border rounded-xl p-4"
                        />
                    </section>

                    {/* Experience */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            Experience
                        </h2>

                        {editedSections.experience.map((item, index) => (
                            <textarea
                                key={index}
                                value={item}
                                onChange={(e) =>
                                    updateExperience(index, e.target.value)
                                }
                                className="w-full h-28 border rounded-xl p-4 mb-4"
                            />
                        ))}
                    </section>

                    {/* Projects */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            Projects
                        </h2>

                        {editedSections.projects.map((item, index) => (
                            <textarea
                                key={index}
                                value={item}
                                onChange={(e) =>
                                    updateProjects(index, e.target.value)
                                }
                                className="w-full h-28 border rounded-xl p-4 mb-4"
                            />
                        ))}
                    </section>

                    {/* Skills */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            Skills
                        </h2>

                        <textarea
                            value={editedSections.skills.join(", ")}
                            onChange={(e) => updateSkills(e.target.value)}
                            className="w-full h-24 border rounded-xl p-4"
                        />
                    </section>

                    {/* Education */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            Education
                        </h2>

                        {editedSections.education.map((item, index) => (
                            <textarea
                                key={index}
                                value={item}
                                onChange={(e) =>
                                    updateEducation(index, e.target.value)
                                }
                                className="w-full h-24 border rounded-xl p-4 mb-4"
                            />
                        ))}
                    </section>

                    <button
                        onClick={() => router.push("/export")}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
                    >
                        Continue to Export
                    </button>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="border-l bg-slate-50 p-8 overflow-y-auto h-screen">
                <h2 className="text-3xl font-bold mb-8">
                    AI Recommendations
                </h2>

                {/* Score */}
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                    <p className="text-slate-500 mb-2">ATS Score</p>
                    <h3 className="text-5xl font-bold">
                        {result.score}%
                    </h3>
                </div>

                {/* Missing Keywords */}
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                    <h3 className="font-semibold mb-4">
                        Missing Keywords
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {result.missing_keywords.map((item, index) => (
                            <span
                                key={index}
                                className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm"
                            >
                {item}
              </span>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                    <h3 className="font-semibold mb-3">
                        Optimized Summary
                    </h3>

                    <p className="text-sm text-slate-700 mb-4 whitespace-pre-line">
                        {result.summary}
                    </p>

                    <button
                        onClick={replaceSummaryWithAI}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        Replace Summary
                    </button>
                </div>

                {/* Bullets */}
                <div className="space-y-4">
                    {result.improved_bullets.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-sm"
                        >
                            <p className="text-sm text-slate-700 mb-4">
                                {item}
                            </p>

                            <button
                                onClick={() => addExperienceBullet(item)}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                            >
                                Add to Experience
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}