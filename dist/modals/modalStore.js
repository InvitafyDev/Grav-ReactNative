"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeAllModals = exports.closeModal = exports.openModal = exports.useModalStore = void 0;
const zustand_1 = require("zustand");
exports.useModalStore = (0, zustand_1.create)((set) => ({
    modals: [],
    openModal: (id, component, props = {}) => set((state) => ({
        modals: [...state.modals, { id, component, props }]
    })),
    closeModal: (id) => set((state) => ({
        modals: state.modals.filter((modal) => modal.id !== id)
    })),
    closeAllModals: () => set({ modals: [] })
}));
// Export utility functions for convenience
const openModal = (id, component, props) => {
    exports.useModalStore.getState().openModal(id, component, props);
};
exports.openModal = openModal;
const closeModal = (id) => {
    exports.useModalStore.getState().closeModal(id);
};
exports.closeModal = closeModal;
const closeAllModals = () => {
    exports.useModalStore.getState().closeAllModals();
};
exports.closeAllModals = closeAllModals;
