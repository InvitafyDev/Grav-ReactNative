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
import { fontSize, fontWeight, borderRadius, colors, spacing } from '../theme/typography';

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
  zIndex?: number;
  isWrapped?: boolean;
  isTopModal?: boolean;
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
  zIndex = 1000,
  isWrapped = false,
  isTopModal = true,
}) => {
  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible && isTopModal) {
        onClose();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [visible, onClose, isTopModal]);

  const content = (
    <>
      {/* Backdrop - solo visible si es el modal superior */}
      {isTopModal && <View style={[styles.backdrop, { zIndex }]} />}

      {/* Modal Content */}
      <SafeAreaView style={[styles.container, { zIndex: zIndex + 1 }]}>
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
              <ActivityIndicator size="large" color={colors.primary} />
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
    </>
  );

  if (isWrapped) {
    return content;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {content}
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
    backgroundColor: colors.backdrop,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.black,
    flex: 1,
  },
  closeButton: {
    padding: spacing.xs,
    marginLeft: 'auto',
  },
  closeIcon: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,
    color: colors.black,
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
    padding: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: spacing.md,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cancelButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: borderRadius.md,
  },
  cancelButtonText: {
    color: colors.danger,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.sm,
    textTransform: 'uppercase',
  },
  saveButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  saveButtonDisabled: {
    backgroundColor: colors.primaryLight,
  },
  saveButtonText: {
    color: colors.white,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.sm,
    textTransform: 'uppercase',
  },
});
