import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import type { TableHeader } from '../interfaces';
import { crudTypography, crudColors, borderRadius } from '../../theme/typography';

interface EditableTextCellProps {
  item: any;
  header: TableHeader;
  idField: string;
}

export const EditableTextCell: React.FC<EditableTextCellProps> = ({ item, header, idField }) => {
  const [value, setValue] = useState(item[header.campo] ?? '');

  const handleBlur = async () => {
    if (header.onUpdate && value !== item[header.campo]) {
      await header.onUpdate(item[idField], header.campo, value);
      item[header.campo] = value;
    }
  };

  return (
    <TextInput
      style={[styles.input, { textAlign: header.align ?? 'left' }]}
      value={String(value)}
      onChangeText={setValue}
      onBlur={handleBlur}
      returnKeyType="done"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    ...crudTypography.cell,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    backgroundColor: 'transparent',
    color: crudColors.neutral,
    minHeight: 32,
  },
});
