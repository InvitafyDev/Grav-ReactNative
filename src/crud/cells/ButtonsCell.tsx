import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { TableHeader, ButtonConfig } from '../interfaces';
import { borderRadius } from '../../theme/typography';

interface ButtonsCellProps {
  item: any;
  header: TableHeader;
  idField: string;
}

export const ButtonsCell: React.FC<ButtonsCellProps> = ({ item, header, idField }) => {
  const buttons = header.buttonsConfig ?? [];
  const visibleButtons = buttons.filter((btn) => btn.show !== false);

  if (visibleButtons.length === 0) return null;

  return (
    <View
      style={[
        styles.container,
        header.align === 'left' && styles.alignLeft,
        header.align === 'right' && styles.alignRight,
        header.align === 'center' && styles.alignCenter,
      ]}
    >
      {visibleButtons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, { backgroundColor: button.color }]}
          onPress={() => button.action(item[idField], item)}
          activeOpacity={0.7}
        >
          {typeof button.icon === 'string' ? (
            <Text style={styles.icon}>{button.icon}</Text>
          ) : (
            button.icon
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  alignCenter: {
    justifyContent: 'center',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    color: '#ffffff',
  },
});
