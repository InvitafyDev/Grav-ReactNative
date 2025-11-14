import React from 'react';
export interface GravModalProps {
    visible: boolean;
    title?: string;
    onClose?: () => void;
    onSave?: () => void;
    saveButtonText?: string;
    cancelButtonText?: string;
    saveButtonDisabled?: boolean;
    loading?: boolean;
    isVista?: boolean;
    children?: React.ReactNode;
}
export declare const GravModal: React.FC<GravModalProps>;
