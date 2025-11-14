import React from 'react';
import { useModalStore } from './modalStore';

export const ModalContainer: React.FC = () => {
  const modals = useModalStore((state) => state.modals);

  return (
    <>
      {modals.map((modal, index) => {
        const ModalComponent = modal.component;
        return <ModalComponent key={`${modal.id}-${index}`} {...modal.props} />;
      })}
    </>
  );
};
