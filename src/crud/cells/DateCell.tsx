import React from 'react';
import { Text, StyleSheet } from 'react-native';
import type { TableHeader } from '../interfaces';
import { crudTypography, crudColors } from '../../theme/typography';

interface DateCellProps {
  item: any;
  header: TableHeader;
  isDatetime?: boolean;
}

export const DateCell: React.FC<DateCellProps> = ({ item, header, isDatetime = false }) => {
  const value = item[header.campo];

  const formatDate = (dateValue: any): string => {
    if (!dateValue) return '';

    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return String(dateValue);

      if (isDatetime) {
        return date.toLocaleString('es-MX', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
      }

      return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    } catch {
      return String(dateValue);
    }
  };

  return (
    <Text
      style={[
        styles.text,
        header.biBold && styles.bold,
        { textAlign: header.align ?? 'left' },
      ]}
      numberOfLines={1}
    >
      {formatDate(value)}
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
