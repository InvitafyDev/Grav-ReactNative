import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import ColorPicker, { Panel1, HueSlider, type ColorFormatsObject } from 'reanimated-color-picker';
import Svg, { Path } from 'react-native-svg';
import {
  crudColors,
  fontSize,
  borderRadius,
  colors,
} from '../theme/typography';

export interface InputFormColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label: string;
  disabled?: boolean;
  obligatory?: boolean;
  icon?: React.ReactNode;
  noMarginTop?: boolean;
}

const PRESET_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#8B5CF6', // Purple
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#84CC16', // Lime
];

export const InputFormColorPicker: React.FC<InputFormColorPickerProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  obligatory = false,
  icon = null,
  noMarginTop = false,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempColor, setTempColor] = useState(value || '#3B82F6');
  const [hexInput, setHexInput] = useState(value?.toUpperCase() || '#3B82F6');

  const selectPresetColor = (color: string) => {
    if (!disabled) {
      onChange(color);
      setHexInput(color.toUpperCase());
    }
  };

  const handleHexInputChange = (text: string) => {
    let formattedText = text.toUpperCase();

    // Auto-add # if not present
    if (formattedText && !formattedText.startsWith('#')) {
      formattedText = '#' + formattedText;
    }

    setHexInput(formattedText);

    // Validate hex format (#RGB or #RRGGBB)
    if (formattedText.match(/^#([A-F0-9]{6}|[A-F0-9]{3})$/)) {
      onChange(formattedText);
    }
  };

  const handleOpenPicker = () => {
    if (!disabled) {
      setTempColor(value || '#3B82F6');
      setShowPicker(true);
    }
  };

  const handleConfirmPicker = () => {
    onChange(tempColor);
    setHexInput(tempColor.toUpperCase());
    setShowPicker(false);
  };

  const handleCancelPicker = () => {
    setShowPicker(false);
  };

  const onColorChange = ({ hex }: ColorFormatsObject) => {
    setTempColor(hex);
  };

  const CheckmarkIcon = () => (
    <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 13l4 4L19 7"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  return (
    <>
      <View style={[styles.container, noMarginTop && styles.noMarginTop]}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}

        <View style={styles.wrapper}>
          {/* Main Label */}
          <Text style={styles.mainLabel}>
            {label}
            {obligatory && <Text style={styles.requiredMark}> *</Text>}
          </Text>

          {/* Preset Colors Section */}
          <Text style={styles.sectionLabel}>Colores predefinidos</Text>
          <View style={styles.presetGrid}>
            {PRESET_COLORS.map((color) => {
              const isSelected = value?.toUpperCase() === color.toUpperCase();
              return (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: color },
                    isSelected && styles.colorSwatchSelected,
                  ]}
                  onPress={() => selectPresetColor(color)}
                  disabled={disabled}
                  activeOpacity={0.7}
                >
                  {isSelected && <CheckmarkIcon />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Custom Color Section */}
          <Text style={[styles.sectionLabel, styles.sectionLabelCustom]}>
            Color personalizado
          </Text>
          <View style={styles.customColorRow}>
            <TouchableOpacity
              style={[
                styles.colorPreview,
                { backgroundColor: value || '#CCCCCC' },
              ]}
              onPress={handleOpenPicker}
              disabled={disabled}
              activeOpacity={0.7}
            />
            <TextInput
              style={[styles.hexInput, disabled && styles.hexInputDisabled]}
              value={hexInput}
              onChangeText={handleHexInputChange}
              placeholder="#3B82F6"
              placeholderTextColor={crudColors.neutral}
              editable={!disabled}
              maxLength={7}
              autoCapitalize="characters"
            />
          </View>
        </View>
      </View>

      {/* Color Picker Modal */}
      <Modal
        visible={showPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancelPicker}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Color</Text>
              <TouchableOpacity onPress={handleCancelPicker}>
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
              </ColorPicker>

              <View style={styles.previewContainer}>
                <View style={[styles.largePreview, { backgroundColor: tempColor }]} />
                <Text style={styles.hexText}>{tempColor.toUpperCase()}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPicker}>
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
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 16,
  },
  noMarginTop: {
    marginTop: 0,
  },
  iconWrapper: {
    width: 16,
    marginRight: 8,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    width: '100%',
  },
  mainLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: crudColors.neutral,
    marginBottom: 16,
  },
  requiredMark: {
    color: colors.danger,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: crudColors.neutral,
    marginBottom: 12,
  },
  sectionLabelCustom: {
    marginTop: 20,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: "100%",
    gap: 8,
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  colorSwatchSelected: {
    borderColor: crudColors.neutral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  customColorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    maxWidth: 600,
  },
  colorPreview: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: crudColors.neutral,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  hexInput: {
    flex: 1,
    padding: 10,
    fontSize: 15,
    borderWidth: 2,
    borderColor: crudColors.neutral,
    borderRadius: 12,
    backgroundColor: crudColors.bg,
    color: crudColors.neutral,
    fontWeight: '500',
  },
  hexInputDisabled: {
    opacity: 0.5,
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
