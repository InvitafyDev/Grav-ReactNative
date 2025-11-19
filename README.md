# Grav React Native

Librería de componentes React Native con inputs especializados, modales y componentes base.

## Instalación

```bash
npm install grav-reactnative
```

### Configuración de SafeAreaProvider (Requerido)

**IMPORTANTE:** Para que los modales y componentes respeten correctamente las áreas seguras del dispositivo (notch, status bar, home indicator, etc.), debes envolver tu aplicación con `SafeAreaProvider`.

```bash
npm install react-native-safe-area-context
```

En tu archivo principal (generalmente `App.tsx` o `App.js`):

```typescript
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ModalContainer } from 'grav-reactnative';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Tu aplicación aquí */}
      <ModalContainer />
    </SafeAreaProvider>
  );
}
```

**¿Por qué es necesario?**
- Sin `SafeAreaProvider`, los modales pueden no respetar las áreas seguras en la primera apertura
- El provider calcula y provee los insets de las áreas seguras a todos los componentes hijos
- Esto evita problemas de race condition donde los valores de SafeArea no están disponibles en el primer render

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

### CRUD

Sistema completo de tablas CRUD con paginación, filtros, sorting y más.

**Ver [CRUD_README.md](./CRUD_README.md) para documentación detallada.**

```typescript
import { CrudWrapper } from 'grav-reactnative';

<CrudWrapper
  Filtros={filtros}
  todosLosObjetos={data}
  tableH={tableHeaders}
  totalRows={data.length}
  PageSize={10}
  currentPage={1}
  selectedAscOrDesc="asc"
  selectedSort="id"
  Titulo_Crud="Mis datos"
  onFilter={handleFilter}
  onAdd={handleAdd}
/>
```

Características:
- ✅ Tabla con FlatList virtualizada
- ✅ Paginación completa
- ✅ Filtros dinámicos
- ✅ Sorting ascendente/descendente
- ✅ Celdas editables en tiempo real
- ✅ Expand/collapse de subrows
- ✅ Múltiples tipos de celdas
- ✅ Componentes custom

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
- **react-native-safe-area-context: 4.0.0 o superior (REQUERIDO)**
- @react-native-community/datetimepicker: 8.0.0 o superior
- react-native-gesture-handler: 2.0.0 o superior
- react-native-reanimated: 3.0.0 o superior
- reanimated-color-picker: 3.0.0 o superior
- expo-image-picker: 15.0.0 o superior

## Solución de problemas

### Los modales no respetan las áreas seguras (notch, status bar)

Si los modales aparecen debajo del notch o status bar en la primera apertura:

1. Asegúrate de haber instalado `react-native-safe-area-context`
2. Envuelve tu aplicación con `<SafeAreaProvider>` en el componente raíz
3. El `ModalContainer` debe estar dentro del `SafeAreaProvider`
4. Reinicia la aplicación completamente

**Ejemplo correcto:**

```typescript
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ModalContainer } from 'grav-reactnative';

export default function App() {
  return (
    <SafeAreaProvider>
      <YourApp />
      <ModalContainer />
    </SafeAreaProvider>
  );
}
```

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