import { create } from "zustand";

export type ResumeResult = {
    score: number;
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: string[];
    improved_bullets: string[];
    summary: string;
};

export type ResumeSections = {
    summary: string;
    experience: string[];
    projects: string[];
    skills: string[];
    education: string[];
};

type ResumeStore = {
    loading: boolean;

    result: ResumeResult | null;

    // raw extracted resume text
    resumeText: string;

    // parsed structured sections
    sections: ResumeSections | null;

    // live editable data
    editedSections: ResumeSections | null;

    setLoading: (value: boolean) => void;
    setResult: (data: ResumeResult) => void;
    setResumeText: (text: string) => void;
    setSections: (data: ResumeSections) => void;
    setEditedSections: (data: ResumeSections) => void;
    resetAll: () => void;
};

export const useResumeStore = create<ResumeStore>((set) => ({
    loading: false,
    result: null,
    resumeText: "",
    sections: null,
    editedSections: null,

    setLoading: (value) => set({ loading: value }),

    setResult: (data) => set({ result: data }),

    setResumeText: (text) => set({ resumeText: text }),

    setSections: (data) =>
        set({
            sections: data,
            editedSections: JSON.parse(JSON.stringify(data)),
        }),

    setEditedSections: (data) =>
        set({
            editedSections: data,
        }),

    resetAll: () =>
        set({
            loading: false,
            result: null,
            resumeText: "",
            sections: null,
            editedSections: null,
        }),
}));