import { create } from "zustand";

type Store = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const useToggleStore = create<Store>((set) => ({
  isOpen: true,
  setIsOpen: (value) => set({ isOpen: value }),
}));
