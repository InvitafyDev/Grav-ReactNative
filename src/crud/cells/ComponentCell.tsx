import React from 'react';
import { View } from 'react-native';
import type { TableHeader } from '../interfaces';

interface ComponentCellProps {
  item: any;
  header: TableHeader;
}

export const ComponentCell: React.FC<ComponentCellProps> = ({ item, header }) => {
  const CustomComponent = header.component;

  if (!CustomComponent) return null;

  return (
    <View>
      <CustomComponent row={item} />
    </View>
  );
};
