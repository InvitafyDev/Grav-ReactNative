import React, { useState } from 'react';
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
  base64Preview: string;
  onImageChange: (base64: string, imageInfo?: ImagePicker.ImagePickerAsset) => void;
  label?: string;
  disabled?: boolean;
}

export const InputFormImage: React.FC<InputFormImageProps> = ({
  base64Preview,
  onImageChange,
  label = 'Imagen',
  disabled = false,
}) => {
  const [loading, setLoading] = useState(false);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
      Alert.alert(
        'Permisos necesarios',
        'Necesitamos permisos para acceder a tu cámara y galería'
      );
      return false;
    }
    return true;
  };

  const pickImageFromLibrary = async () => {
    if (disabled) return;

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const base64 = asset.base64
          ? `data:image/jpeg;base64,${asset.base64}`
          : asset.uri;
        onImageChange(base64, asset);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la imagen');
    } finally {
      setLoading(false);
    }
  };

  const pickImageFromCamera = async () => {
    if (disabled) return;

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const base64 = asset.base64
          ? `data:image/jpeg;base64,${asset.base64}`
          : asset.uri;
        onImageChange(base64, asset);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto');
    } finally {
      setLoading(false);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Seleccionar imagen',
      'Elige una opción',
      [
        {
          text: 'Galería',
          onPress: pickImageFromLibrary,
        },
        {
          text: 'Cámara',
          onPress: pickImageFromCamera,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const reset = () => {
    onImageChange('');
  };

  return (
    <View style={styles.imageContainer}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={[styles.loadButton, disabled && styles.loadButtonDisabled]}
        onPress={showImageOptions}
        disabled={disabled || loading}
      >
        <Text style={styles.loadButtonText}>
          {loading ? 'Cargando...' : '📷 Cargar Imagen'}
        </Text>
      </TouchableOpacity>

      <View style={styles.previewContainer}>
        {base64Preview ? (
          <>
            <Image
              source={{ uri: base64Preview }}
              style={styles.previewImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={reset}
              disabled={disabled}
            >
              <Text style={styles.removeButtonText}>🗑️ Eliminar Imagen</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.dropZone}>
            <Text style={styles.dropZoneText}>📷</Text>
            <Text style={styles.dropZoneSubtext}>
              Presiona "Cargar Imagen" para seleccionar una foto
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    padding: 16,
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    borderRadius: borderRadius.md,
    backgroundColor: '#f9fafb',
    marginVertical: 8,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: crudColors.neutral,
    marginBottom: 8,
  },
  loadButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  loadButtonDisabled: {
    opacity: 0.5,
  },
  loadButtonText: {
    fontSize: fontSize.base,
    color: crudColors.neutral,
    fontWeight: '500',
  },
  previewContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: borderRadius.md,
  },
  removeButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: borderWidth.thin,
    borderColor: colors.danger,
    borderRadius: borderRadius.md,
    backgroundColor: 'transparent',
  },
  removeButtonText: {
    color: colors.danger,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  dropZone: {
    width: '100%',
    minHeight: 200,
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: crudColors.neutral,
    borderRadius: borderRadius.md,
  },
  dropZoneText: {
    fontSize: 48,
    marginBottom: 8,
  },
  dropZoneSubtext: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: fontSize.sm,
  },
});
