import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  crudColors,
  fontSize,
  borderRadius,
  borderWidth,
  colors,
} from '../theme/typography';

export interface InputFormImageProps {
  value: string | null;
  onChange: (base64: string | null) => void;
  label?: string;
  disabled?: boolean;
  obligatory?: boolean;
  noMarginTop?: boolean;
}

export const InputFormImage: React.FC<InputFormImageProps> = ({
  value,
  onChange,
  label = 'Imagen',
  disabled = false,
  obligatory = false,
  noMarginTop = false,
}) => {
  const pickImage = async () => {
    if (disabled) return;

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        'Permisos requeridos',
        'Se necesitan permisos para acceder a la galería de fotos.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      const base64String = `data:image/jpeg;base64,${result.assets[0].base64}`;
      onChange(base64String);
    }
  };

  const removeImage = () => {
    if (!disabled) {
      onChange(null);
    }
  };

  return (
    <View style={[styles.container, noMarginTop && styles.noMarginTop]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {obligatory && <Text style={styles.requiredMark}> *</Text>}
        </Text>
      )}

      <View style={[styles.imageContainer, disabled && styles.containerDisabled]}>
        <TouchableOpacity
          style={styles.loadButton}
          onPress={pickImage}
          disabled={disabled}
        >
          <Text style={styles.loadButtonText}>Cargar Imagen</Text>
        </TouchableOpacity>

        <View style={styles.previewContainer}>
          {value ? (
            <>
              <Image source={{ uri: value }} style={styles.previewImage} resizeMode="contain" />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={removeImage}
                disabled={disabled}
              >
                <Text style={styles.removeButtonText}>Eliminar Imagen</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.dropZone}>
              <Text style={styles.dropZoneText}>
                Carga una imagen para previsualizar
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 31,
  },
  noMarginTop: {
    marginTop: 0,
  },
  label: {
    fontSize: fontSize.base,
    color: crudColors.neutral,
    marginBottom: 4,
  },
  requiredMark: {
    color: colors.danger,
  },
  imageContainer: {
    width: '100%',
    padding: 16,
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    borderRadius: borderRadius.md,
    backgroundColor: '#f9fafb',
  },
  containerDisabled: {
    opacity: 0.5,
  },
  loadButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    borderRadius: borderRadius.md,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  loadButtonText: {
    fontSize: fontSize.xs,
    color: crudColors.neutral,
    fontWeight: '500',
  },
  previewContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    maxWidth: 384,
    height: 300,
    borderRadius: borderRadius.md,
  },
  removeButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: borderWidth.thin,
    borderColor: colors.danger,
    borderRadius: borderRadius.md,
    backgroundColor: 'transparent',
  },
  removeButtonText: {
    fontSize: fontSize.xs,
    color: colors.danger,
    fontWeight: '500',
  },
  dropZone: {
    width: '100%',
    maxWidth: 384,
    minHeight: 150,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: crudColors.neutral,
    borderRadius: borderRadius.md,
  },
  dropZoneText: {
    fontSize: fontSize.xs,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
