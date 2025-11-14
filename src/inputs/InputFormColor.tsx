import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';
import {
  crudColors,
  fontSize,
  borderRadius,
  borderWidth,
  colors,
} from '../theme/typography';

export interface InputFormColorProps {
  value: string; // Hex color string
  onChange: (color: string) => void;
  label: string;
  disabled?: boolean;
  obligatory?: boolean;
  icon?: React.ReactNode;
}

export const InputFormColor: React.FC<InputFormColorProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  obligatory = false,
  icon = null,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempColor, setTempColor] = useState(value || '#000000');

  const handleComplete = () => {
    onChange(tempColor);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setTempColor(value || '#000000');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}

      <View style={styles.inputWrapper}>
        <TouchableOpacity
          style={[styles.colorButton, disabled && styles.colorButtonDisabled]}
          onPress={() => !disabled && setModalVisible(true)}
          disabled={disabled}
        >
          <View
            style={[
              styles.colorPreview,
              { backgroundColor: value || '#000000' },
            ]}
          />
          <Text style={styles.colorText}>{(value || '#000000').toUpperCase()}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          {label}
          {obligatory && <Text style={styles.requiredMark}> *</Text>}
        </Text>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <ColorPicker
                value={tempColor}
                onComplete={(color: { hex: string }) => setTempColor(color.hex)}
                style={styles.colorPicker}
              >
                <Preview />
                <Panel1 />
                <HueSlider />
                <OpacitySlider />
                <Swatches />
              </ColorPicker>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleComplete}
              >
                <Text style={styles.saveButtonText}>Seleccionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 31,
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
  },
  colorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    minHeight: 40,
  },
  colorButtonDisabled: {
    opacity: 0.5,
  },
  colorPreview: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    marginRight: 12,
  },
  colorText: {
    fontSize: fontSize.base,
    color: crudColors.neutral,
    fontFamily: 'monospace',
  },
  label: {
    position: 'absolute',
    left: 4,
    top: -22,
    fontSize: 12,
    color: crudColors.neutral,
    paddingHorizontal: 4,
    backgroundColor: crudColors.bg,
  },
  requiredMark: {
    color: colors.danger,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: crudColors.bg,
    borderRadius: borderRadius.md,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: crudColors.neutral,
  },
  modalClose: {
    fontSize: 24,
    color: crudColors.neutral,
    fontWeight: '600',
  },
  pickerContainer: {
    padding: 20,
  },
  colorPicker: {
    width: '100%',
    gap: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: borderRadius.md,
  },
  cancelButtonText: {
    color: colors.danger,
    fontWeight: '600',
    fontSize: fontSize.sm,
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  saveButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: fontSize.sm,
  },
});
