# Grav React Native

Librería de componentes React Native con inputs especializados, modales y componentes base.

## Instalación

```bash
npm install grav-reactnative
```

## Dependencias requeridas

Esta librería requiere las siguientes dependencias peer instaladas en tu proyecto:

### Dependencias para inputs especiales

Dependiendo de los inputs que utilices, necesitarás instalar las siguientes librerías:

#### InputFormDate e InputFormDateAndHours

Para los componentes de fecha necesitas instalar:

```bash
npm install @react-native-community/datetimepicker
```

#### InputFormColor e InputFormColorPicker

Para los componentes de selección de color necesitas instalar:

```bash
npm install react-native-reanimated reanimated-color-picker
```

```bash
npx expo install react-native-gesture-handler```

```bash
npx expo install react-native-worklets@0.5.1
```

#### InputFormImage

Para el componente de carga de imágenes necesitas instalar:

```bash
npx expo install expo-image-picker
```

### Instalación completa (todos los inputs especiales)

Si planeas usar todos los inputs especiales, instala todas las dependencias de una vez:

```bash
npm install @react-native-community/datetimepicker react-native-reanimated react-native-gesture-handler reanimated-color-picker expo-image-picker
```

## Componentes disponibles

### Inputs estándar

Estos inputs no requieren dependencias adicionales:

- `InputFormText` - Input de texto básico
- `InputFormPassword` - Input de contraseña con botón para mostrar/ocultar
- `InputFormNumber` - Input numérico
- `InputFormTextArea` - Área de texto multilínea
- `InputFormBool` - Switch booleano

### Inputs especiales

Estos inputs requieren dependencias adicionales (ver sección anterior):

#### InputFormDate

Input de fecha con selector nativo para cada plataforma.

**Dependencia requerida:** `@react-native-community/datetimepicker`

```typescript
import { InputFormDate } from 'grav-reactnative';

<InputFormDate
  value={date}
  onChange={(newDate) => setDate(newDate)}
  label="Fecha de nacimiento"
  obligatory
/>
```

#### InputFormDateAndHours

Input de fecha y hora con selector nativo.

**Dependencia requerida:** `@react-native-community/datetimepicker`

```typescript
import { InputFormDateAndHours } from 'grav-reactnative';

<InputFormDateAndHours
  value={datetime}
  onChange={(newDateTime) => setDatetime(newDateTime)}
  label="Fecha y hora de entrega"
/>
```

#### InputFormColor

Selector de color con modal interactivo y preview del color.

**Dependencias requeridas:**
- `react-native-reanimated`
- `react-native-gesture-handler`
- `reanimated-color-picker`

```typescript
import { InputFormColor } from 'grav-reactnative';

<InputFormColor
  value={color}
  onChange={(newColor) => setColor(newColor)}
  label="Color principal"
  showOpacity={true}
/>
```

#### InputFormColorPicker

Versión alternativa del selector de color.

**Dependencias requeridas:**
- `react-native-reanimated`
- `react-native-gesture-handler`
- `reanimated-color-picker`

```typescript
import { InputFormColorPicker } from 'grav-reactnative';

<InputFormColorPicker
  value={color}
  onChange={(newColor) => setColor(newColor)}
  label="Color de fondo"
/>
```

#### InputFormImage

Componente para cargar y previsualizar imágenes desde la galería del dispositivo.

**Dependencia requerida:** `expo-image-picker`

```typescript
import { InputFormImage } from 'grav-reactnative';

<InputFormImage
  value={imageBase64}
  onChange={(base64) => setImageBase64(base64)}
  label="Foto de perfil"
  obligatory
/>
```

**Nota:** El componente devuelve la imagen en formato base64 con el prefijo `data:image/jpeg;base64,`.

### Alertas

Sistema de alertas reutilizables sin dependencias externas.

#### showSuccessAlert

Alerta de éxito que se cierra automáticamente después de 1.5 segundos.

```typescript
import { showSuccessAlert } from 'grav-reactnative';

showSuccessAlert('Datos guardados correctamente');
```

#### showErrorAlert

Alerta de error con botón OK para cerrar.

```typescript
import { showErrorAlert } from 'grav-reactnative';

showErrorAlert('No se pudo guardar la información');
```

#### showConfirmationAlert

Alerta de confirmación con botones Sí/No. Retorna una Promise.

```typescript
import { showConfirmationAlert } from 'grav-reactnative';

// Con callback
showConfirmationAlert(
  'Confirmación',
  '¿Desea eliminar este elemento?',
  () => {
    console.log('Usuario confirmó');
  }
);

// Con async/await
const confirmed = await showConfirmationAlert(
  'Guardar cambios',
  '¿Desea guardar los cambios realizados?'
);

if (confirmed) {
  // Usuario confirmó
  console.log('Guardando...');
}
```

### Otros componentes

- `Button` - Botón personalizable
- `Card` - Tarjeta contenedora
- `GravModal` - Sistema de modales
- `ModalContainer` - Contenedor de modales

## Props comunes de los inputs

Todos los inputs comparten estas props base:

```typescript
{
  value: any;              // Valor del input
  onChange: (value) => void; // Callback al cambiar
  label: string;           // Etiqueta del input
  disabled?: boolean;      // Deshabilitar input
  obligatory?: boolean;    // Mostrar asterisco de campo obligatorio
  icon?: React.ReactNode;  // Icono personalizado
  noMarginTop?: boolean;   // Remover margen superior
}
```

## Ejemplo completo

```typescript
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  InputFormText,
  InputFormDate,
  InputFormColor,
  Button
} from 'grav-reactnative';

function MyForm() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [favoriteColor, setFavoriteColor] = useState('#3b82f6');

  return (
    <View>
      <InputFormText
        value={name}
        onChange={setName}
        label="Nombre completo"
        obligatory
      />

      <InputFormDate
        value={birthDate}
        onChange={setBirthDate}
        label="Fecha de nacimiento"
      />

      <InputFormColor
        value={favoriteColor}
        onChange={setFavoriteColor}
        label="Color favorito"
        showOpacity
      />

      <Button title="Guardar" onPress={() => console.log('Guardado')} />
    </View>
  );
}
```

## Versiones mínimas requeridas

- React: 18.0.0 o superior
- React Native: 0.70.0 o superior
- @react-native-community/datetimepicker: 8.0.0 o superior
- react-native-gesture-handler: 2.0.0 o superior
- react-native-reanimated: 3.0.0 o superior
- reanimated-color-picker: 3.0.0 o superior
- expo-image-picker: 15.0.0 o superior

## Solución de problemas

### Error con react-native-reanimated

Si recibes un error sobre `react-native-reanimated`, asegúrate de:

1. Haber agregado el plugin en `babel.config.js`
2. Haber reiniciado el bundler con `--reset-cache`
3. Para iOS, ejecutar `pod install`

### Error con @react-native-community/datetimepicker

Si el selector de fecha no funciona:

1. Verifica que la versión instalada sea compatible
2. Para iOS, ejecuta `pod install` en la carpeta ios
3. Limpia y reconstruye el proyecto

## Licencia

MIT