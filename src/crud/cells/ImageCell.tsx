import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import type { TableHeader } from '../interfaces';

interface ImageCellProps {
  item: any;
  header: TableHeader;
  onImageClick?: (src: string) => void;
}

const SIZE_MAP = {
  sm: 30,
  md: 50,
  lg: 70,
};

export const ImageCell: React.FC<ImageCellProps> = ({ item, header, onImageClick }) => {
  const imageUrl = item[header.campo];
  const size = SIZE_MAP[header.imageSize ?? 'md'];

  if (!imageUrl) return null;

  const handlePress = () => {
    if (onImageClick) {
      onImageClick(imageUrl);
    } else if (header.action) {
      header.action(item[header.imageField ?? 'id']);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { width: size, height: size }]}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 8,
  },
});
