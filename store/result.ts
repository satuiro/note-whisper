import { create } from "zustand";

export const useResultStore = create((set) => ({
    result: "",
    updateResult: (text: string) => set(() => ({
        result: text
    }))
}))