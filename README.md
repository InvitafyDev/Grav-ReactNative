# Grav React Native

Una librería completa de componentes UI para React Native, incluyendo modals e inputs con animaciones y estilos personalizables.

## 📦 Instalación

```bash
npm install grav-reactnative
```

### Dependencias Requeridas

Esta librería requiere las siguientes dependencias base (obligatorias):

```bash
# Para proyectos Expo (recomendado)
npx expo install react-native-safe-area-context react-native-svg react-native-gesture-handler react-native-reanimated

# Para proyectos React Native CLI
npm install react-native-safe-area-context react-native-svg react-native-gesture-handler react-native-reanimated
```

> **Nota para Expo**: Es muy probable que tu proyecto ya tenga estas dependencias instaladas, ya que son comunes en Expo.

### Dependencias Opcionales

Dependiendo de los componentes que uses, necesitarás instalar estas dependencias:

**Para Inputs de Fecha/Hora** (InputFormDate, InputFormDateAndHours):
```bash
# Expo
npx expo install @react-native-community/datetimepicker

# React Native CLI
npm install @react-native-community/datetimepicker
```

**Para Inputs de Color** (InputFormColor):
```bash
npm install reanimated-color-picker
```

**Para Input de Imagen** (InputFormImage):
```bash
# Expo
npx expo install expo-image-picker

# React Native CLI (no soportado - usa react-native-image-picker)
```

**Instalación completa** (todas las dependencias opcionales):
```bash
# Expo
npx expo install @react-native-community/datetimepicker expo-image-picker
npm install reanimated-color-picker

# React Native CLI
npm install @react-native-community/datetimepicker reanimated-color-picker
```

> **Nota**: Las dependencias opcionales solo son necesarias si usas los componentes específicos que las requieren.

## 🚀 Uso Rápido

### Modals

```tsx
import { ModalContainer, openModal, closeModal, GravModal } from 'grav-reactnative';

// En tu App.tsx
function App() {
  return (
    <View>
      <Button onPress={() => openModal('myModal', MyModal, {})}>
        Abrir Modal
      </Button>
      <ModalContainer />
    </View>
  );
}

// MyModal.tsx
function MyModal() {
  return (
    <GravModal
      visible={true}
      title="Mi Modal"
      onClose={() => closeModal('myModal')}
      onSave={() => alert('Guardado')}
    >
      <Text>Contenido del modal</Text>
    </GravModal>
  );
}
```

### Inputs Básicos

```tsx
import {
  InputFormText,
  InputFormPassword,
  InputFormNumber,
  InputFormTextArea,
  InputFormBool,
} from 'grav-reactnative';

function MyForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(0);
  const [bio, setBio] = useState('');
  const [accept, setAccept] = useState(false);

  return (
    <View>
      <InputFormText
        value={name}
        onChangeText={setName}
        label="Nombre"
        obligatory={true}
      />

      <InputFormPassword
        value={password}
        onChangeText={setPassword}
        label="Contraseña"
        validation={true}
      />

      <InputFormNumber
        value={age}
        onChangeText={setAge}
        label="Edad"
      />

      <InputFormTextArea
        value={bio}
        onChangeText={setBio}
        label="Biografía"
        rows={4}
      />

      <InputFormBool
        value={accept}
        onValueChange={setAccept}
        label="Acepto términos"
      />
    </View>
  );
}
```

### Inputs Avanzados

#### Select
```tsx
import { InputFormSelect, SelectOption } from 'grav-reactnative';

const [country, setCountry] = useState<SelectOption | null>(null);
const options: SelectOption[] = [
  { value: 'mx', label: 'México' },
  { value: 'us', label: 'Estados Unidos' },
];

<InputFormSelect
  value={country}
  onChange={setCountry}
  options={options}
  label="País"
  placeholder="Selecciona un país"
/>
```

#### Fecha
```tsx
import { InputFormDate } from 'grav-reactnative';

const [date, setDate] = useState('2024-01-01');

<InputFormDate
  value={date}
  onChange={setDate}
  label="Fecha de nacimiento"
/>
```

#### Fecha y Hora
```tsx
import { InputFormDateAndHours } from 'grav-reactnative';

const [datetime, setDatetime] = useState(new Date().toISOString());

<InputFormDateAndHours
  value={datetime}
  onChange={setDatetime}
  label="Fecha y hora de cita"
/>
```

#### Color
```tsx
import { InputFormColor, InputFormColorPicker } from 'grav-reactnative';

const [color, setColor] = useState('#3B82F6');

// Picker completo con sliders
<InputFormColor
  value={color}
  onChange={setColor}
  label="Color favorito"
/>

// Picker con colores predefinidos + hex input
<InputFormColorPicker
  value={color}
  onChange={setColor}
  label="Color del tema"
/>
```

#### Imagen
```tsx
import { InputFormImage } from 'grav-reactnative';

const [image, setImage] = useState('');

<InputFormImage
  base64Preview={image}
  onImageChange={(base64) => setImage(base64)}
  label="Foto de perfil"
/>
```

## 📚 Componentes Disponibles

### Modals
- `GravModal` - Modal completo con header, body, footer
- `ModalContainer` - Container para renderizar modals
- `openModal()` - Función para abrir modals
- `closeModal()` - Función para cerrar modals
- `closeAllModals()` - Función para cerrar todos los modals

### Inputs Básicos
- `InputFormText` - Input de texto con label flotante
- `InputFormPassword` - Input de contraseña con validación
- `InputFormNumber` - Input numérico
- `InputFormTextArea` - TextArea multilinea
- `InputFormBool` - Checkbox/Switch personalizado

### Inputs Avanzados
- `InputFormSelect` - Selector con modal
- `InputFormDate` - Selector de fecha nativo
- `InputFormDateAndHours` - Selector de fecha y hora
- `InputFormColor` - Picker de color completo
- `InputFormColorPicker` - Picker con colores predefinidos
- `InputFormImage` - Selector de imagen (galería/cámara)

## 🎨 Personalización

Todos los componentes usan un sistema de temas centralizado. Puedes importar y usar los colores y estilos:

```tsx
import { crudColors, fontSize, borderRadius } from 'grav-reactnative/theme/typography';
```

## 📄 Licencia

MIT

## 👨‍💻 Autor

Tu Nombre
