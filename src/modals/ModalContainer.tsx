import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { useModalStore } from './modalStore';

export const ModalContainer: React.FC = () => {
  const modals = useModalStore((state) => state.modals);

  if (modals.length === 0) return null;

  return (
    <Modal transparent visible animationType="none">
      <View style={styles.container}>
        {modals.map((modal, index) => {
          const ModalComponent = modal.component;
          const zIndex = 1000 + index * 10;
          const isTopModal = index === modals.length - 1;

          return (
            <View
              key={`${modal.id}-${index}`}
              style={[styles.modalLayer, { zIndex }]}
              pointerEvents={isTopModal ? 'auto' : 'box-none'}
            >
              <ModalComponent {...modal.props} zIndex={zIndex} isWrapped isTopModal={isTopModal} />
            </View>
          );
        })}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalLayer: {
    ...StyleSheet.absoluteFillObject,
  },
});
