import { create } from 'zustand';
import { ComponentType } from 'react';

export interface ModalConfig {
  id: string;
  component: ComponentType<any>;
  props?: Record<string, any>;
}

interface ModalStore {
  modals: ModalConfig[];
  openModal: (id: string, component: ComponentType<any>, props?: Record<string, any>) => void;
  closeModal: (id: string) => void;
  closeTopModal: () => void;
  closeAllModals: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: [],

  openModal: (id, component, props = {}) =>
    set((state) => ({
      modals: [...state.modals, { id, component, props }]
    })),

  closeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id)
    })),

  closeTopModal: () =>
    set((state) => ({
      modals: state.modals.slice(0, -1)
    })),

  closeAllModals: () =>
    set({ modals: [] })
}));

// Export utility functions for convenience
export const openModal = (id: string, component: ComponentType<any>, props?: Record<string, any>) => {
  useModalStore.getState().openModal(id, component, props);
};

export const closeModal = (id: string) => {
  useModalStore.getState().closeModal(id);
};

export const closeTopModal = () => {
  useModalStore.getState().closeTopModal();
};

export const closeAllModals = () => {
  useModalStore.getState().closeAllModals();
};
