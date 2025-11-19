import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { TableHeader } from '../interfaces';
import { crudTypography, crudColors, borderRadius } from '../../theme/typography';

interface DualTextButtonCellProps {
  item: any;
  header: TableHeader;
}

export const DualTextButtonCell: React.FC<DualTextButtonCellProps> = ({ item, header }) => {
  const text1 = header.textField1 ? item[header.textField1] : '';
  const text2 = header.textField2 ? item[header.textField2] : '';
  const color1 = header.colorField1 ? item[header.colorField1] : crudColors.neutral;
  const color2 = header.colorField2 ? item[header.colorField2] : crudColors.neutral;
  const separator = header.separator ?? ' / ';

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor: color1 }]}>
        <Text style={styles.text}>{text1}</Text>
      </View>
      <Text style={styles.separator}>{separator}</Text>
      <View style={[styles.badge, { backgroundColor: color2 }]}>
        <Text style={styles.text}>{text2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  text: {
    ...crudTypography.cell,
    color: '#ffffff',
    fontSize: 12,
  },
  separator: {
    ...crudTypography.cell,
    marginHorizontal: 4,
    color: crudColors.neutral,
  },
});
