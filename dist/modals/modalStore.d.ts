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
    closeAllModals: () => void;
}
export declare const useModalStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ModalStore>>;
export declare const openModal: (id: string, component: ComponentType<any>, props?: Record<string, any>) => void;
export declare const closeModal: (id: string) => void;
export declare const closeAllModals: () => void;
export {};
