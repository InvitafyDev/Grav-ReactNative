# CRUD Component for React Native

Sistema completo de CRUD para React Native, portado desde la librería de Svelte.

## Características implementadas ✅

- ✅ Tabla con FlatList (virtualización automática)
- ✅ Paginación completa
- ✅ Filtros dinámicos (text, number, date, datetime, select, bool)
- ✅ Sorting (asc/desc)
- ✅ Todas las celdas básicas: Text, Number, Bool, Date, Datetime, Image
- ✅ Celdas editables: EditableText, EditableNumber, EditableBool
- ✅ Celdas especiales: Buttons, Component, DynamicButton, DualTextButton, ConditionalCell, MultiTextButton
- ✅ Loading state con animación
- ✅ Empty state
- ✅ Expand/collapse rows (subRows)
- ✅ Componentes custom en celdas

## Características NO implementadas ❌

- ❌ Drag & Drop reordering (requiere gesture-handler complejo)
- ❌ Export a Excel/PDF (requiere librerías adicionales)
- ❌ Sticky columns (solo sticky header de FlatList)

## Uso básico

```tsx
import { CrudWrapper, type TableHeaderType, type FiltrosI } from 'grav-reactnative';

const MiCRUD = () => {
  const [data, setData] = useState([]);
  const [filtros, setFiltros] = useState<FiltrosI[]>([
    {
      tipo: 'text',
      label: 'Buscar',
      value: null,
    },
    {
      tipo: 'select',
      label: 'Categoría',
      value: null,
      options: [
        { value: 1, label: 'Categoría 1' },
        { value: 2, label: 'Categoría 2' },
      ],
    },
  ]);

  const tableHeaders: TableHeaderType[] = [
    {
      titulo: 'ID',
      biSort: true,
      tipo: 'Text',
      biBold: false,
      align: 'center',
      campo: 'id',
      buttonsConfig: null,
    },
    {
      titulo: 'Nombre',
      biSort: true,
      tipo: 'EditableText',
      biBold: true,
      align: 'left',
      campo: 'nombre',
      buttonsConfig: null,
      onUpdate: async (id, campo, newValue) => {
        console.log('Actualizar:', id, campo, newValue);
        // Aquí tu lógica de actualización
      },
    },
    {
      titulo: 'Activo',
      biSort: false,
      tipo: 'EditableBool',
      biBold: false,
      align: 'center',
      campo: 'activo',
      buttonsConfig: null,
    },
    {
      titulo: 'Acciones',
      biSort: false,
      tipo: 'Buttons',
      biBold: false,
      align: 'center',
      campo: 'id',
      buttonsConfig: [
        {
          icon: '👁',
          color: '#10b981',
          action: (id) => console.log('Ver', id),
          tooltip: 'Ver detalle',
          show: true,
        },
        {
          icon: '✏️',
          color: '#f59e0b',
          action: (id) => console.log('Editar', id),
          tooltip: 'Editar',
          show: true,
        },
        {
          icon: '🗑',
          color: '#ef4444',
          action: (id) => console.log('Eliminar', id),
          tooltip: 'Eliminar',
          show: true,
        },
      ],
    },
  ];

  const handleFilter = (newFilters: FiltrosI[]) => {
    setFiltros(newFilters);
    // Aquí tu lógica para filtrar los datos
  };

  const handleAdd = () => {
    console.log('Agregar nuevo');
  };

  return (
    <CrudWrapper
      Filtros={filtros}
      todosLosObjetos={data}
      tableH={tableHeaders}
      totalRows={data.length}
      PageSize={10}
      currentPage={1}
      selectedAscOrDesc="asc"
      selectedSort="id"
      loading={false}
      showAddButton={true}
      showImportButton={false}
      Titulo_Crud="Mi CRUD"
      idField="id"
      expandEnabled={false}
      onFilter={handleFilter}
      onAdd={handleAdd}
    />
  );
};
```

## Tipos de celdas disponibles

### Celdas básicas
- **Text**: Texto simple
- **Number**: Números
- **Bool**: Checkbox visual (check/cross)
- **Date**: Fecha (formato: DD/MM/YYYY)
- **Datetime**: Fecha y hora
- **Image**: Imagen con click para ampliar

### Celdas editables
- **EditableText**: Input de texto editable
- **EditableNumber**: Input numérico editable
- **EditableBool**: Checkbox editable

### Celdas especiales
- **Buttons**: Botones de acción personalizables
- **Component**: Renderiza un componente React personalizado
- **DynamicButton**: Botón con texto/icono dinámico desde datos
- **DualTextButton**: Dos badges con textos y colores
- **ConditionalCell**: Renderiza diferente contenido según condición
- **MultiTextButton**: Lista de badges (vertical u horizontal)

## Ejemplo con expand/collapse (subRows)

```tsx
<CrudWrapper
  {...props}
  expandEnabled={true}
  subRowsField="subRows"
  subRowHeaders={subTableHeaders} // Opcional: headers diferentes para subrows
/>
```

## Ejemplo con componente custom

```tsx
const MiComponenteCustom = ({ row }: { row: any }) => (
  <View>
    <Text>Custom: {row.nombre}</Text>
  </View>
);

const tableHeaders: TableHeaderType[] = [
  {
    titulo: 'Custom',
    biSort: false,
    tipo: 'Component',
    biBold: false,
    align: 'center',
    campo: 'custom',
    buttonsConfig: null,
    component: MiComponenteCustom,
  },
];
```

## Filtros dinámicos

Los filtros soportan:
- `text`: Input de texto
- `number`: Input numérico
- `bool`: Checkbox
- `date`: Date picker
- `datetime`: Date + time picker
- `select`: Dropdown con opciones (estáticas o desde servicio async)

```tsx
const filtros: FiltrosI[] = [
  {
    tipo: 'select',
    label: 'Categoría',
    value: null,
    service: async () => {
      const response = await fetch('/api/categorias');
      return response.json(); // Debe retornar { value: any, label: string }[]
    },
  },
];
```

## Performance

- Usa `FlatList` con virtualización automática
- Solo renderiza items visibles en pantalla
- Configurado para máxima performance:
  - `initialNumToRender={20}`
  - `maxToRenderPerBatch={20}`
  - `windowSize={10}`
  - `removeClippedSubviews={true}`

## Estilos

Usa el sistema de theming de `typography.ts`:
- `crudColors`: Colores del CRUD
- `crudTypography`: Tipografía
- `borderRadius`, `borderWidth`, `spacing`: Dimensiones

## Próximas mejoras (futuro)

- [ ] Drag & Drop con `react-native-gesture-handler`
- [ ] Export a Excel/PDF
- [ ] Sticky columns
- [ ] Búsqueda global
- [ ] Selección múltiple de rows
