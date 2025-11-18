import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
} from 'react-native';
import ColorPicker, { Panel1, HueSlider, OpacitySlider, type ColorFormatsObject } from 'reanimated-color-picker';
import {
  crudColors,
  fontSize,
  borderRadius,
  borderWidth,
  colors,
} from '../theme/typography';

export interface InputFormColorProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
  disabled?: boolean;
  obligatory?: boolean;
  icon?: React.ReactNode;
  noMarginTop?: boolean;
  showOpacity?: boolean;
}

export const InputFormColor: React.FC<InputFormColorProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  obligatory = false,
  icon = null,
  noMarginTop = false,
  showOpacity = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [tempColor, setTempColor] = useState(value || '#3b82f6');
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, labelPosition]);

  const handlePress = () => {
    if (disabled) return;
    setIsFocused(true);
    setTempColor(value || '#3b82f6');
    setShowPicker(true);
  };

  const handleConfirm = () => {
    onChange(tempColor);
    setShowPicker(false);
    setIsFocused(false);
  };

  const handleCancel = () => {
    setShowPicker(false);
    setIsFocused(false);
  };

  const onColorChange = ({ hex }: ColorFormatsObject) => {
    setTempColor(hex);
  };

  const labelStyle = {
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -10],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    backgroundColor: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', crudColors.bg],
    }),
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={disabled}
        style={[styles.container, noMarginTop && styles.noMarginTop]}
      >
        {icon && <View style={styles.iconWrapper}>{icon}</View>}

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, disabled && styles.inputDisabled]}
            value={value || ''}
            editable={false}
            pointerEvents="none"
          />

          <Animated.Text style={[styles.label, labelStyle]} pointerEvents="none">
            {label}
            {obligatory && <Text style={styles.requiredMark}> *</Text>}
          </Animated.Text>

          <View style={[styles.colorPreview, { backgroundColor: value || '#cccccc' }]} />
        </View>
      </TouchableOpacity>

      <Modal
        visible={showPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Color</Text>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.modalButton}>Cancelar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <ColorPicker
                value={tempColor}
                onChangeJS={onColorChange}
                style={styles.colorPicker}
              >
                <Panel1 style={styles.panel} />
                <HueSlider style={styles.slider} />
                {showOpacity && <OpacitySlider style={styles.slider} />}
              </ColorPicker>

              <View style={styles.previewContainer}>
                <View style={[styles.largePreview, { backgroundColor: tempColor }]} />
                <Text style={styles.hexText}>{tempColor}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    borderRadius: borderRadius.md,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 31,
    backgroundColor: crudColors.bg,
  },
  noMarginTop: {
    marginTop: 0,
  },
  iconWrapper: {
    width: 16,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 5,
    fontSize: fontSize.base,
    color: crudColors.neutral,
    minHeight: 40,
  },
  inputDisabled: {
    opacity: 0.5,
  },
  label: {
    position: 'absolute',
    left: 4,
    color: crudColors.neutral,
    paddingHorizontal: 4,
  },
  requiredMark: {
    color: colors.danger,
  },
  colorPreview: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: crudColors.neutral,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: crudColors.bg,
    borderRadius: borderRadius.lg,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: crudColors.neutral,
  },
  modalButton: {
    fontSize: fontSize.base,
    color: colors.primary,
  },
  pickerContainer: {
    alignItems: 'center',
  },
  colorPicker: {
    width: '100%',
    gap: 16,
  },
  panel: {
    width: '100%',
    height: 250,
    borderRadius: borderRadius.md,
  },
  slider: {
    width: '100%',
    height: 40,
    borderRadius: borderRadius.md,
  },
  previewContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  largePreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: crudColors.neutral,
    marginBottom: 10,
  },
  hexText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: crudColors.neutral,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: fontSize.base,
    fontWeight: '600',
  },
});
