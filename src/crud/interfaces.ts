export interface ButtonConfig {
  icon: React.ReactNode;
  color: string;
  action: (id: number, row?: any) => void;
  tooltip?: string;
  show?: boolean;
}

export interface TableHeader {
  titulo: string;
  biSort: boolean;
  tipo:
    | 'Text'
    | 'Number'
    | 'Bool'
    | 'Image'
    | 'Date'
    | 'Datetime'
    | 'EditableBool'
    | 'EditableText'
    | 'EditableNumber'
    | 'Buttons'
    | 'DynamicButton'
    | 'DualTextButton'
    | 'ConditionalCell'
    | 'MultiTextButton'
    | 'Component';
  biBold: boolean;
  align?: 'left' | 'right' | 'center';
  campo: string;
  colorCampo?: string;
  buttonsConfig?: ButtonConfig[] | null;
  flex?: number;
  width?: number; // Fixed width in pixels

  // Editable cells
  onUpdate?: (id: number | string, campo: string, newValue: any) => Promise<void> | void;

  // DynamicButton
  textField?: string;
  colorField?: string;
  styleField?: string;
  iconField?: string;
  iconPosition?: 'left' | 'right';
  onButtonClick?: (id: number | string, row: any) => Promise<void> | void;

  // DualTextButton
  textField1?: string;
  textField2?: string;
  colorField1?: string;
  colorField2?: string;
  separator?: string;

  // ConditionalCell
  conditionField?: string;
  whenTrue?: {
    tipo: 'Text' | 'DualTextButton';
    textField?: string;
    colorField?: string;
    textField1?: string;
    textField2?: string;
    colorField1?: string;
    colorField2?: string;
    separator?: string;
  };
  whenFalse?: {
    tipo: 'Text' | 'DualTextButton';
    textField?: string;
    colorField?: string;
    textField1?: string;
    textField2?: string;
    colorField1?: string;
    colorField2?: string;
    separator?: string;
  };

  // MultiTextButton
  itemsField?: string;
  multiLayout?: 'vertical' | 'horizontal';
  multiSeparator?: string;

  // Component
  component?: React.ComponentType<{ row: any }>;

  // Image
  imageField?: string;
  imageSize?: 'sm' | 'md' | 'lg';
  action?: (id: number | string) => Promise<void> | void;
}

export interface FiltrosI {
  tipo: 'number' | 'text' | 'date' | 'datetime' | 'select' | 'bool';
  label: string;
  value: any;
  options?: { value: any; label: string }[];
  service?: () => Promise<{ value: any; label: string }[]>;
}

export interface CrudWrapperProps {
  Filtros: FiltrosI[];
  todosLosObjetos: any[];
  tableH: TableHeader[];
  totalRows: number;
  PageSize: number;
  currentPage: number;
  selectedAscOrDesc: string;
  selectedSort: string;
  loading?: boolean;
  showAddButton?: boolean;
  showImportButton?: boolean;
  Titulo_Crud: string;
  idField?: string;
  expandEnabled?: boolean;
  subRowsField?: string;
  subRowHeaders?: TableHeader[];
  onFilter: (filters: FiltrosI[]) => void;
  onAdd: () => void;
  onImport?: () => void;
  onCellUpdate?: (id: number | string, campo: string, newValue: any) => Promise<void> | void;
}
