import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { crudTypography, borderRadius } from '../../theme/typography';

interface NivelBadgeProps {
  row: any;
}

export const NivelBadge: React.FC<NivelBadgeProps> = ({ row }) => {
  const nivel = row.nivel || '';
  const nivelColor = row.nivelColor || '#6b7280';

  return (
    <View style={[styles.badge, { backgroundColor: nivelColor }]}>
      <Text style={styles.text}>{nivel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    alignSelf: 'center',
  },
  text: {
    ...crudTypography.button,
    color: '#ffffff',
    fontWeight: '600',
  },
});