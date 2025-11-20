import React, { useMemo } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import type { TableHeader } from './interfaces';
import { TableHeader as TableHeaderComponent } from './components/TableHeader';
import { TableRow } from './components/TableRow';
import { crudColors, crudTypography, borderRadius, spacing } from '../theme/typography';

interface CrudTableProps {
  todosLosRegistros: any[];
  tableHeaders: TableHeader[];
  loading?: boolean;
  idField?: string;
  expandEnabled?: boolean;
  subRowsField?: string;
  subRowHeaders?: TableHeader[];
  selectedSort: string;
  selectedAscOrDesc: 'asc' | 'desc';
  onSort: (field: string) => void;
  onImageClick?: (src: string) => void;
}

export const CrudTable: React.FC<CrudTableProps> = ({
  todosLosRegistros,
  tableHeaders,
  loading = false,
  idField = 'id',
  expandEnabled = false,
  subRowsField = 'subRows',
  subRowHeaders,
  selectedSort,
  selectedAscOrDesc,
  onSort,
  onImageClick,
}) => {
  // Calcular anchos automáticamente para cada columna
  const tableHeadersWithWidth = useMemo(() => {
    return tableHeaders.map((header) => {
      // Si ya tiene width definido, usarlo
      if (header.width) {
        return header;
      }

      // Calcular width basado en el tipo de celda y flex
      let calculatedWidth: number;

      switch (header.tipo) {
        case 'Buttons':
          // Botones: calcular según número de botones
          const numButtons = header.buttonsConfig?.filter(b => b.show !== false).length || 0;
          calculatedWidth = numButtons * 40 + 16; // 40px por botón + padding
          break;

        case 'Bool':
        case 'EditableBool':
          calculatedWidth = 60; // Checkbox/toggle
          break;

        case 'Image':
          const imageSize = header.imageSize || 'md';
          const sizeMap = { sm: 50, md: 70, lg: 90 };
          calculatedWidth = sizeMap[imageSize] + 16;
          break;

        case 'Date':
        case 'Datetime':
          calculatedWidth = header.tipo === 'Datetime' ? 150 : 120;
          break;

        case 'Number':
        case 'EditableNumber':
          calculatedWidth = 100;
          break;

        case 'Text':
        case 'EditableText':
        case 'DynamicButton':
        case 'DualTextButton':
        case 'ConditionalCell':
        case 'MultiTextButton':
        case 'Component':
        default:
          // Usar flex para calcular un ancho proporcional
          const flex = header.flex ?? 1;
          calculatedWidth = flex * 150; // 150px base por unidad de flex
          break;
      }

      return {
        ...header,
        width: calculatedWidth,
      };
    });
  }, [tableHeaders]);

  const effectiveSubRowHeaders = subRowHeaders || tableHeadersWithWidth;

  const renderSubRows = (subRows: any[]) => {
    return (
      <View style={styles.subRowsWrapper}>
        {subRows.map((subRow, index) => (
          <TableRow
            key={`subrow-${index}`}
            item={subRow}
            tableHeaders={effectiveSubRowHeaders}
            idField={idField}
            expandEnabled={false}
            subRowsField={subRowsField}
            onImageClick={onImageClick}
          />
        ))}
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TableRow
      item={item}
      tableHeaders={tableHeadersWithWidth}
      idField={idField}
      expandEnabled={expandEnabled}
      subRowsField={subRowsField}
      subRowHeaders={subRowHeaders}
      onImageClick={onImageClick}
      renderSubRows={renderSubRows}
    />
  );

  const renderEmpty = () => {
    if (loading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay datos disponibles</Text>
      </View>
    );
  };

  const renderLoading = () => {
    if (!loading) return null;

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={crudColors.button} />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={styles.tableWrapper}>
          <TableHeaderComponent
            tableHeaders={tableHeadersWithWidth}
            expandEnabled={expandEnabled}
            selectedSort={selectedSort}
            selectedAscOrDesc={selectedAscOrDesc}
            onSort={onSort}
          />

          {loading ? (
            renderLoading()
          ) : (
            <FlatList
              data={todosLosRegistros}
              renderItem={renderItem}
              keyExtractor={(item, index) => item[idField]?.toString() || index.toString()}
              ListEmptyComponent={renderEmpty}
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              windowSize={10}
              removeClippedSubviews={true}
              scrollEnabled={false}
              nestedScrollEnabled={true}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: crudColors.bg,
    borderRadius: borderRadius.md,
  },
  tableWrapper: {
    minWidth: '100%',
  },
  subRowsWrapper: {
    paddingLeft: spacing.md,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    ...crudTypography.cell,
    color: crudColors.neutral,
    opacity: 0.6,
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  loadingText: {
    ...crudTypography.cell,
    color: crudColors.neutral,
    marginTop: spacing.md,
  },
});
