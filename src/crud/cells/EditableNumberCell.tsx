import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import type { TableHeader } from '../interfaces';
import { crudTypography, crudColors, borderRadius } from '../../theme/typography';

interface EditableNumberCellProps {
  item: any;
  header: TableHeader;
  idField: string;
}

export const EditableNumberCell: React.FC<EditableNumberCellProps> = ({ item, header, idField }) => {
  const [value, setValue] = useState(String(item[header.campo] ?? ''));

  const handleBlur = async () => {
    const numValue = parseFloat(value);
    if (header.onUpdate && !isNaN(numValue) && numValue !== item[header.campo]) {
      await header.onUpdate(item[idField], header.campo, numValue);
      item[header.campo] = numValue;
    }
  };

  const handleChangeText = (text: string) => {
    const cleaned = text.replace(/[^0-9.-]/g, '');
    setValue(cleaned);
  };

  return (
    <TextInput
      style={[styles.input, { textAlign: header.align ?? 'right' }]}
      value={value}
      onChangeText={handleChangeText}
      onBlur={handleBlur}
      keyboardType="numeric"
      returnKeyType="done"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    ...crudTypography.cell,
    paddingHorizontal: 4,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    backgroundColor: 'transparent',
    color: crudColors.neutral,
    minHeight: 32,
  },
});
