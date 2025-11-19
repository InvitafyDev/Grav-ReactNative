import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { TableHeader } from '../interfaces';
import { crudTypography, crudColors, borderRadius } from '../../theme/typography';

interface MultiTextButtonCellProps {
  item: any;
  header: TableHeader;
}

interface MultiTextItem {
  text: string;
  color?: string;
}

export const MultiTextButtonCell: React.FC<MultiTextButtonCellProps> = ({ item, header }) => {
  const items: MultiTextItem[] = header.itemsField ? item[header.itemsField] : [];
  const layout = header.multiLayout ?? 'vertical';
  const separator = header.multiSeparator ?? '';

  if (!items || items.length === 0) return null;

  return (
    <View style={[styles.container, layout === 'horizontal' && styles.horizontal]}>
      {items.map((multiItem, index) => (
        <React.Fragment key={index}>
          <View
            style={[
              styles.badge,
              { backgroundColor: multiItem.color ?? crudColors.neutral },
            ]}
          >
            <Text style={styles.text}>{multiItem.text}</Text>
          </View>
          {separator && index < items.length - 1 && layout === 'horizontal' && (
            <Text style={styles.separator}>{separator}</Text>
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
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
