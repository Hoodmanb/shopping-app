import { create } from "zustand";

const useCartStore = create((set) => ({
    data: {},
    stateUpdate: {},

    // Add or modify multiple fields at once
    addOrModify: (newFields) =>
        set((state) => ({
            data: { ...state.data, ...newFields },
        })),

    update: (newFields) =>
        set((state) => ({
            stateUpdate: { ...state.stateUpdate, ...newFields }, // Fixed typo here
        })),

    getValue: (key) => (state) => state.stateUpdate[key] || 0,
}));

export default useCartStore;
