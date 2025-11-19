import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { TableHeader } from '../interfaces';
import { crudTypography, crudColors, borderRadius } from '../../theme/typography';

interface ConditionalCellProps {
  item: any;
  header: TableHeader;
}

export const ConditionalCell: React.FC<ConditionalCellProps> = ({ item, header }) => {
  const condition = header.conditionField ? item[header.conditionField] : false;
  const config = condition ? header.whenTrue : header.whenFalse;

  if (!config) return null;

  if (config.tipo === 'Text') {
    const text = config.textField ? item[config.textField] : '';
    const backgroundColor = config.colorField ? item[config.colorField] : 'transparent';

    return (
      <View style={[styles.textContainer, { backgroundColor }]}>
        <Text style={[styles.text, backgroundColor !== 'transparent' && styles.whiteText]}>
          {text}
        </Text>
      </View>
    );
  }

  if (config.tipo === 'DualTextButton') {
    const text1 = config.textField1 ? item[config.textField1] : '';
    const text2 = config.textField2 ? item[config.textField2] : '';
    const color1 = config.colorField1 ? item[config.colorField1] : crudColors.neutral;
    const color2 = config.colorField2 ? item[config.colorField2] : crudColors.neutral;
    const separator = config.separator ?? ' / ';

    return (
      <View style={styles.dualContainer}>
        <View style={[styles.badge, { backgroundColor: color1 }]}>
          <Text style={styles.badgeText}>{text1}</Text>
        </View>
        <Text style={styles.separator}>{separator}</Text>
        <View style={[styles.badge, { backgroundColor: color2 }]}>
          <Text style={styles.badgeText}>{text2}</Text>
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  text: {
    ...crudTypography.cell,
    color: crudColors.neutral,
  },
  whiteText: {
    color: '#ffffff',
  },
  dualContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
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
