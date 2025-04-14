import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isOpen: false,
  component: null, // holds the component to render
  openModal: (Component) => set({ isOpen: true, component: Component }),
  closeModal: () => set({ isOpen: false, component: null }),
}));