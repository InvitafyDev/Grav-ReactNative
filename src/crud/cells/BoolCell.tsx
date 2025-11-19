import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { TableHeader } from '../interfaces';
import { crudColors } from '../../theme/typography';

interface BoolCellProps {
  item: any;
  header: TableHeader;
}

export const BoolCell: React.FC<BoolCellProps> = ({ item, header }) => {
  const value = item[header.campo];

  return (
    <View style={styles.container}>
      {value ? (
        <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <Path
            d="M20 6L9 17l-5-5"
            stroke={crudColors.neutral}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ) : (
        <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <Path
            d="M18 6L6 18M6 6l12 12"
            stroke={crudColors.neutral}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
