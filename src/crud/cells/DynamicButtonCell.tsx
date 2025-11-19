import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import type { TableHeader } from '../interfaces';
import { crudTypography, borderRadius } from '../../theme/typography';

interface DynamicButtonCellProps {
  item: any;
  header: TableHeader;
  idField: string;
}

export const DynamicButtonCell: React.FC<DynamicButtonCellProps> = ({ item, header, idField }) => {
  const text = header.textField ? item[header.textField] : '';
  const backgroundColor = header.colorField ? item[header.colorField] : '#6b7280';
  const icon = header.iconField ? item[header.iconField] : null;
  const iconPosition = header.iconPosition ?? 'left';

  const handlePress = async () => {
    if (header.onButtonClick) {
      await header.onButtonClick(item[idField], item);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {icon && iconPosition === 'left' && <Text style={styles.icon}>{icon}</Text>}
      <Text style={styles.text}>{text}</Text>
      {icon && iconPosition === 'right' && <Text style={styles.icon}>{icon}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    gap: 6,
  },
  text: {
    ...crudTypography.button,
    color: '#ffffff',
  },
  icon: {
    fontSize: 14,
    color: '#ffffff',
  },
});
