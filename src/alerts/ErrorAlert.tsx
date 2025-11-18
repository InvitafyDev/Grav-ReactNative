import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors, fontSize, borderRadius, spacing } from '../theme/typography';

interface ErrorAlertProps {
  title?: string;
  onClose: () => void;
  zIndex?: number;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = 'Algo salió mal',
  onClose,
  zIndex = 1000,
}) => {
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Modal transparent visible animationType="fade">
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
              <Circle cx="12" cy="12" r="10" fill={colors.danger} />
              <Path
                d="M15 9l-6 6M9 9l6 6"
                stroke={colors.white}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>

          <Text style={styles.title}>{title}</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
    marginBottom: spacing.xl,
  },
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  buttonText: {
    fontSize: fontSize.base,
    fontWeight: 'bold',
    color: colors.danger,
    textTransform: 'uppercase',
  },
});
