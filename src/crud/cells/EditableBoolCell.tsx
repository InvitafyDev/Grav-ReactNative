import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { TableHeader } from '../interfaces';
import { crudColors, borderRadius } from '../../theme/typography';

interface EditableBoolCellProps {
  item: any;
  header: TableHeader;
  idField: string;
}

export const EditableBoolCell: React.FC<EditableBoolCellProps> = ({ item, header, idField }) => {
  const value = item[header.campo];

  const handlePress = async () => {
    const newValue = !value;
    item[header.campo] = newValue;

    if (header.onUpdate) {
      await header.onUpdate(item[idField], header.campo, newValue);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, value && styles.checked]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {value ? (
        <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <Path
            d="M20 6L9 17l-5-5"
            stroke={crudColors.bg}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ) : (
        <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <Path
            d="M5 12h14"
            stroke={crudColors.neutral}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: crudColors.neutral,
    backgroundColor: 'transparent',
  },
  checked: {
    backgroundColor: crudColors.neutral,
    borderColor: crudColors.neutral,
  },
});
