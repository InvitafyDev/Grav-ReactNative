import React from 'react';
import { Text, StyleSheet } from 'react-native';
import type { TableHeader } from '../interfaces';
import { crudTypography, crudColors } from '../../theme/typography';

interface TextCellProps {
  item: any;
  header: TableHeader;
}

export const TextCell: React.FC<TextCellProps> = ({ item, header }) => {
  const backgroundColor = header.colorCampo && item[header.colorCampo]
    ? item[header.colorCampo]
    : 'transparent';

  return (
    <Text
      style={[
        styles.text,
        header.biBold && styles.bold,
        {
          textAlign: header.align ?? 'left',
          backgroundColor,
          color: backgroundColor !== 'transparent' ? crudColors.bg : crudColors.neutral,
        },
      ]}
      numberOfLines={2}
    >
      {item[header.campo] ?? ''}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    ...crudTypography.cell,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  bold: {
    fontWeight: '700',
  },
});
