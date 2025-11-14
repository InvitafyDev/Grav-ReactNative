import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export const GravModal: React.FC<GravModalProps> = ({
  visible,
  title = 'Modal Title',
  onClose = () => {},
  onSave = () => {},
  saveButtonText = 'Guardar',
  cancelButtonText = 'Cancelar',
  saveButtonDisabled = false,
  loading = false,
  isVista = false,
  children,
}) => {
  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        onClose();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <View style={styles.backdrop} />

      {/* Modal Content */}
      <SafeAreaView style={styles.container}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            /* Loading State */
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#10b981" />
            </View>
          ) : (
            <>
              {/* Body */}
              <ScrollView
                style={styles.body}
                contentContainerStyle={styles.bodyContent}
              >
                {children}
              </ScrollView>

              {/* Footer */}
              {!isVista && (
                <View style={styles.footer}>
                  <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>{cancelButtonText}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={onSave}
                    style={[
                      styles.saveButton,
                      saveButtonDisabled && styles.saveButtonDisabled,
                    ]}
                    disabled={saveButtonDisabled}
                  >
                    <Text style={styles.saveButtonText}>{saveButtonText}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  closeButton: {
    padding: 4,
    marginLeft: 'auto',
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 12,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#10b981',
    borderRadius: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#6ee7b7',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },
});
