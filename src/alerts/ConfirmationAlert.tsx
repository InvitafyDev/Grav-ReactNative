import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, fontSize, borderRadius, spacing } from '../theme/typography';

interface ConfirmationAlertProps {
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  zIndex?: number;
  isWrapped?: boolean;
}

export const ConfirmationAlert: React.FC<ConfirmationAlertProps> = ({
  title = 'Confirmación',
  message = '¿Desea guardar los cambios?',
  onConfirm,
  onCancel,
  zIndex = 1000,
  isWrapped = false,
}) => {
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  const content = (
    <View style={[styles.overlay, { zIndex }]}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
            zIndex: zIndex + 1,
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              stroke="#fbbf24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>NO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>SÍ</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );

  if (isWrapped) {
    return content;
  }

  return (
    <Modal transparent visible animationType="fade">
      {content}
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.backdrop,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing['2xl'],
    alignItems: 'center',
    minWidth: 280,
    maxWidth: 340,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: fontSize.base,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  cancelButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  cancelButtonText: {
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    color: colors.danger,
    textTransform: 'uppercase',
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.sm,
  },
  confirmButtonText: {
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    color: colors.white,
    textTransform: 'uppercase',
  },
});
