"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { useRouter } from "next/navigation";

export default function EditorPage() {
    const router = useRouter();

    const result = useResumeStore((s) => s.result);
    const editedSections = useResumeStore((s) => s.editedSections);
    const setEditedSections = useResumeStore(
        (s) => s.setEditedSections
    );

    if (!result || !editedSections) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-black">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        No Resume Data Found
                    </h1>

                    <button
                        onClick={() => router.push("/upload")}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
                    >
                        Upload Resume
                    </button>
                </div>
            </div>
        );
    }

    const updateSection = (
        key: "experience" | "projects" | "education",
        index: number,
        value: string
    ) => {
        const copy = [...editedSections[key]];
        copy[index] = value;

        setEditedSections({
            ...editedSections,
            [key]: copy,
        });
    };

    const addItem = (
        key: "experience" | "projects" | "education"
    ) => {
        setEditedSections({
            ...editedSections,
            [key]: [...editedSections[key], ""],
        });
    };

    const replaceSummary = () => {
        setEditedSections({
            ...editedSections,
            summary: result.summary,
        });
    };

    const addBulletToExperience = (text: string) => {
        setEditedSections({
            ...editedSections,
            experience: [...editedSections.experience, text],
        });
    };

    return (
        <div className="grid lg:grid-cols-3 min-h-screen bg-white text-black">
            {/* LEFT */}
            <div className="lg:col-span-2 p-8 overflow-y-auto h-screen">
                <h1 className="text-4xl font-bold mb-8">
                    Resume Editor
                </h1>

                {/* Summary */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">
                        Summary
                    </h2>

                    <textarea
                        value={editedSections.summary}
                        onChange={(e) =>
                            setEditedSections({
                                ...editedSections,
                                summary: e.target.value,
                            })
                        }
                        className="w-full h-36 border rounded-xl p-4"
                    />
                </section>

                {/* Experience */}
                <section className="mb-10">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-2xl font-semibold">
                            Experience
                        </h2>

                        <button
                            onClick={() => addItem("experience")}
                            className="text-indigo-600"
                        >
                            + Add
                        </button>
                    </div>

                    {editedSections.experience.map((item, i) => (
                        <textarea
                            key={i}
                            value={item}
                            onChange={(e) =>
                                updateSection(
                                    "experience",
                                    i,
                                    e.target.value
                                )
                            }
                            className="w-full h-32 border rounded-xl p-4 mb-4"
                        />
                    ))}
                </section>

                {/* Projects */}
                <section className="mb-10">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-2xl font-semibold">
                            Projects
                        </h2>

                        <button
                            onClick={() => addItem("projects")}
                            className="text-indigo-600"
                        >
                            + Add
                        </button>
                    </div>

                    {editedSections.projects.map((item, i) => (
                        <textarea
                            key={i}
                            value={item}
                            onChange={(e) =>
                                updateSection(
                                    "projects",
                                    i,
                                    e.target.value
                                )
                            }
                            className="w-full h-32 border rounded-xl p-4 mb-4"
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
                        onChange={(e) =>
                            setEditedSections({
                                ...editedSections,
                                skills: e.target.value
                                    .split(",")
                                    .map((x) => x.trim())
                                    .filter(Boolean),
                            })
                        }
                        className="w-full h-28 border rounded-xl p-4"
                    />
                </section>

                {/* Education */}
                <section className="mb-10">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-2xl font-semibold">
                            Education
                        </h2>

                        <button
                            onClick={() => addItem("education")}
                            className="text-indigo-600"
                        >
                            + Add
                        </button>
                    </div>

                    {editedSections.education.map((item, i) => (
                        <textarea
                            key={i}
                            value={item}
                            onChange={(e) =>
                                updateSection(
                                    "education",
                                    i,
                                    e.target.value
                                )
                            }
                            className="w-full h-28 border rounded-xl p-4 mb-4"
                        />
                    ))}
                </section>
            </div>

            {/* RIGHT */}
            <div className="border-l bg-slate-50 p-8 overflow-y-auto h-screen">
                <h2 className="text-3xl font-bold mb-6">
                    AI Suggestions
                </h2>

                <div className="bg-white p-6 rounded-2xl mb-6">
                    <h3 className="font-semibold mb-3">
                        Better Summary
                    </h3>

                    <p className="text-sm mb-4">
                        {result.summary}
                    </p>

                    <button
                        onClick={replaceSummary}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        Replace Summary
                    </button>
                </div>

                {result.improved_bullets.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white p-6 rounded-2xl mb-4"
                    >
                        <p className="text-sm mb-4">{item}</p>

                        <button
                            onClick={() =>
                                addBulletToExperience(item)
                            }
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                        >
                            Add to Experience
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}