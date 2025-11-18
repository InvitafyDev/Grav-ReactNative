import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors, fontSize, borderRadius, spacing } from '../theme/typography';

interface SuccessAlertProps {
  title?: string;
  onClose: () => void;
  zIndex?: number;
  isWrapped?: boolean;
  isTopModal?: boolean;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({
  title = 'Se guardó correctamente',
  onClose,
  zIndex = 1000,
  isWrapped = false,
  isTopModal = true,
}) => {
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      onClose();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const content = (
    <View style={[styles.overlay, { zIndex, backgroundColor: isTopModal ? colors.backdrop : 'transparent' }]}>
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
            <Circle cx="12" cy="12" r="10" fill={colors.primary} />
            <Path
              d="M9 12l2 2 4-4"
              stroke={colors.white}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>

        <Text style={styles.title}>{title}</Text>
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
  },
});
