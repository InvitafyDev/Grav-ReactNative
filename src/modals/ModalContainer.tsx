import React from 'react';
import { useModalStore } from './modalStore';

export const ModalContainer: React.FC = () => {
  const modals = useModalStore((state) => state.modals);

  if (modals.length === 0) return null;

  return (
    <>
      {modals.map((modal, index) => {
        const ModalComponent = modal.component;
        const isTopModal = index === modals.length - 1;

        return (
          <ModalComponent
            key={`${modal.id}-${index}`}
            {...modal.props}
            isTopModal={isTopModal}
          />
        );
      })}
    </>
  );
};
