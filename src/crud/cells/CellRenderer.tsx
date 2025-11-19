import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { TableHeader } from '../interfaces';
import { TextCell } from './TextCell';
import { BoolCell } from './BoolCell';
import { DateCell } from './DateCell';
import { ImageCell } from './ImageCell';
import { EditableTextCell } from './EditableTextCell';
import { EditableNumberCell } from './EditableNumberCell';
import { EditableBoolCell } from './EditableBoolCell';
import { ButtonsCell } from './ButtonsCell';
import { ComponentCell } from './ComponentCell';
import { DynamicButtonCell } from './DynamicButtonCell';
import { DualTextButtonCell } from './DualTextButtonCell';
import { ConditionalCell } from './ConditionalCell';
import { MultiTextButtonCell } from './MultiTextButtonCell';

interface CellRendererProps {
  item: any;
  header: TableHeader;
  idField: string;
  onImageClick?: (src: string) => void;
}

export const CellRenderer: React.FC<CellRendererProps> = ({
  item,
  header,
  idField,
  onImageClick,
}) => {
  const renderCell = () => {
    switch (header.tipo) {
      case 'Text':
      case 'Number':
        return <TextCell item={item} header={header} />;

      case 'Bool':
        return <BoolCell item={item} header={header} />;

      case 'Date':
        return <DateCell item={item} header={header} isDatetime={false} />;

      case 'Datetime':
        return <DateCell item={item} header={header} isDatetime={true} />;

      case 'Image':
        return <ImageCell item={item} header={header} onImageClick={onImageClick} />;

      case 'EditableText':
        return <EditableTextCell item={item} header={header} idField={idField} />;

      case 'EditableNumber':
        return <EditableNumberCell item={item} header={header} idField={idField} />;

      case 'EditableBool':
        return <EditableBoolCell item={item} header={header} idField={idField} />;

      case 'Buttons':
        return <ButtonsCell item={item} header={header} idField={idField} />;

      case 'Component':
        return <ComponentCell item={item} header={header} />;

      case 'DynamicButton':
        return <DynamicButtonCell item={item} header={header} idField={idField} />;

      case 'DualTextButton':
        return <DualTextButtonCell item={item} header={header} />;

      case 'ConditionalCell':
        return <ConditionalCell item={item} header={header} />;

      case 'MultiTextButton':
        return <MultiTextButtonCell item={item} header={header} />;

      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.cell,
        header.align === 'left' && styles.alignLeft,
        header.align === 'right' && styles.alignRight,
        header.align === 'center' && styles.alignCenter,
      ]}
    >
      {renderCell()}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  alignLeft: {
    alignItems: 'flex-start',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignRight: {
    alignItems: 'flex-end',
  },
});
