import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {
  crudColors,
  fontSize,
  borderRadius,
  borderWidth,
  colors,
} from '../theme/typography';

export interface InputFormColorPickerProps {
  value: string; // Hex color string
  onChange: (color: string) => void;
  label: string;
  disabled?: boolean;
  obligatory?: boolean;
  icon?: React.ReactNode;
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
}) => {
  const [hexInput, setHexInput] = useState(value || '#3B82F6');

  const handleHexInput = (text: string) => {
    let formattedText = text.toUpperCase();

    // Auto-add # if not present
    if (formattedText && !formattedText.startsWith('#')) {
      formattedText = '#' + formattedText;
    }

    setHexInput(formattedText);

    // Validate hex format
    if (formattedText.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      onChange(formattedText);
    }
  };

  const selectColor = (color: string) => {
    if (!disabled) {
      onChange(color);
      setHexInput(color);
    }
  };

  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}

      <View style={styles.colorPickerWrapper}>
        <Text style={styles.mainLabel}>
          {label}
          {obligatory && <Text style={styles.requiredMark}> *</Text>}
        </Text>

        {/* Preset Colors Section */}
        <Text style={styles.sectionLabel}>Colores predefinidos</Text>
        <View style={styles.presetColorsGrid}>
          {PRESET_COLORS.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorSwatch,
                value?.toUpperCase() === color.toUpperCase() && styles.colorSwatchSelected,
                { backgroundColor: color },
              ]}
              onPress={() => selectColor(color)}
              disabled={disabled}
            >
              {value?.toUpperCase() === color.toUpperCase() && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Custom Color Section */}
        <Text style={[styles.sectionLabel, styles.customSectionLabel]}>
          Color personalizado
        </Text>
        <View style={styles.customColorPicker}>
          <TouchableOpacity
            style={[
              styles.colorPreview,
              { backgroundColor: value || '#3B82F6' },
            ]}
            disabled={disabled}
          >
            <View style={styles.colorPreviewInner} />
          </TouchableOpacity>

          <TextInput
            style={[styles.hexInput, disabled && styles.hexInputDisabled]}
            value={hexInput}
            onChangeText={handleHexInput}
            placeholder="#3B82F6"
            placeholderTextColor="#9ca3af"
            maxLength={7}
            autoCapitalize="characters"
            editable={!disabled}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 16,
    gap: 8,
  },
  iconWrapper: {
    width: 16,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPickerWrapper: {
    flex: 1,
    width: '100%',
  },
  mainLabel: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: crudColors.neutral,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: fontSize.base,
    fontWeight: '500',
    color: crudColors.neutral,
    marginBottom: 12,
    marginTop: 20,
  },
  customSectionLabel: {
    marginTop: 20,
  },
  presetColorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    maxWidth: 200,
  },
  colorSwatch: {
    width: 40,
    height: 40,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  checkmark: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  customColorPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorPreview: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: crudColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPreviewInner: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  hexInput: {
    flex: 1,
    padding: 10,
    fontSize: fontSize.base,
    borderWidth: 2,
    borderColor: crudColors.border,
    borderRadius: 12,
    backgroundColor: crudColors.light,
    color: crudColors.neutral,
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  hexInputDisabled: {
    opacity: 0.5,
  },
  requiredMark: {
    color: colors.danger,
  },
});
