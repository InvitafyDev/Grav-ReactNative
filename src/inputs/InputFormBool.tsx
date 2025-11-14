import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  crudColors,
  fontSize,
  borderRadius,
  borderWidth,
} from '../theme/typography';

export interface InputFormBoolProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
  disabled?: boolean;
}

export const InputFormBool: React.FC<InputFormBoolProps> = ({
  value,
  onValueChange,
  label,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkboxButton, value && styles.checked]}
        onPress={() => onValueChange(!value)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={[styles.icon, value && styles.iconChecked]}>
          {value ? '✓' : '−'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 31,
  },
  checkboxButton: {
    marginRight: 8,
    height: 43,
    width: 43,
    backgroundColor: 'transparent',
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    borderRadius: borderRadius.md,
    paddingHorizontal: 8,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: crudColors.neutral,
  },
  icon: {
    fontSize: 24,
    color: crudColors.neutral,
    fontWeight: 'bold',
  },
  iconChecked: {
    color: crudColors.bg,
  },
  label: {
    fontSize: fontSize.base,
    margin: 0,
    color: crudColors.neutral,
  },
});
