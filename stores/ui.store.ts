"use client";
//stores/ui.store.ts
import { create } from "zustand";

type UIState = {
  isApplicationDetailOpen: boolean;
  selectedApplicationId: string | null;
  openApplicationDetail: (id: string) => void;
  closeApplicationDetail: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isApplicationDetailOpen: false,
  selectedApplicationId: null,
  openApplicationDetail: (id) =>
    set({ isApplicationDetailOpen: true, selectedApplicationId: id }),
  closeApplicationDetail: () =>
    set({ isApplicationDetailOpen: false, selectedApplicationId: null }),
}));