import React from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
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
  const effectiveSubRowHeaders = subRowHeaders || tableHeaders;

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
      tableHeaders={tableHeaders}
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
      <TableHeaderComponent
        tableHeaders={tableHeaders}
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
          scrollEnabled={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: crudColors.bg,
    borderRadius: borderRadius.md,
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
