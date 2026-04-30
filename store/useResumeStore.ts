import { create } from "zustand";

type ResumeData = {
    score: number;
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: string[];
    improved_bullets: string[];
    summary: string;
};

type Store = {
    loading: boolean;
    result: ResumeData | null;
    resumeText: string;
    setLoading: (v: boolean) => void;
    setResult: (data: ResumeData) => void;
    setResumeText: (text: string) => void;
};

export const useResumeStore = create<Store>((set) => ({
    loading: false,
    result: null,
    resumeText: "",
    setLoading: (v) => set({ loading: v }),
    setResult: (data) => set({ result: data }),
    setResumeText: (text) => set({ resumeText: text }),
}));