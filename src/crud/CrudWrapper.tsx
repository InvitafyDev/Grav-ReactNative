import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import type { CrudWrapperProps, TableHeader } from './interfaces';
import { CrudFilters } from './CrudFilters';
import { CrudTable } from './CrudTable';
import { Pagination } from './Pagination';
import { crudColors, borderRadius, spacing } from '../theme/typography';

export const CrudWrapper: React.FC<CrudWrapperProps> = ({
  Filtros,
  todosLosObjetos,
  tableH,
  totalRows,
  PageSize: initialPageSize,
  currentPage: initialCurrentPage,
  selectedAscOrDesc: initialAscOrDesc,
  selectedSort: initialSort,
  loading = false,
  showAddButton = true,
  showImportButton = false,
  Titulo_Crud,
  idField = 'id',
  expandEnabled = false,
  subRowsField = 'subRows',
  subRowHeaders,
  onFilter,
  onAdd,
  onImport,
  onCellUpdate,
}) => {
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [selectedAscOrDesc, setSelectedAscOrDesc] = useState<'asc' | 'desc'>(
    initialAscOrDesc as 'asc' | 'desc'
  );

  useEffect(() => {
    setCurrentPage(initialCurrentPage);
    console.log(todosLosObjetos);
    
  }, [initialCurrentPage]);

  useEffect(() => {
    setPageSize(initialPageSize);
  }, [initialPageSize]);

  const handleFilter = (filters: typeof Filtros) => {
    onFilter(filters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onFilter(Filtros);
  };

  const handleSort = (field: string) => {
    const newDirection = selectedSort === field && selectedAscOrDesc === 'asc' ? 'desc' : 'asc';
    setSelectedSort(field);
    setSelectedAscOrDesc(newDirection);
    onFilter(Filtros);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  // Apply global onCellUpdate to headers that don't have their own onUpdate
  const processedTableHeaders: TableHeader[] = tableH.map((header) => {
    if (
      (header.tipo === 'EditableBool' ||
        header.tipo === 'EditableText' ||
        header.tipo === 'EditableNumber') &&
      !header.onUpdate &&
      onCellUpdate
    ) {
      return { ...header, onUpdate: onCellUpdate };
    }
    return header;
  });

  return (
    <ScrollView style={styles.container}>
      <CrudFilters
        Filtros={Filtros}
        PageSize={pageSize}
        showAddButton={showAddButton}
        showImportButton={showImportButton}
        Titulo_Crud={Titulo_Crud}
        onFilter={handleFilter}
        onAdd={onAdd}
        onImport={onImport}
        onPageSizeChange={handlePageSizeChange}
      />

      <View style={styles.tableContainer}>
        <CrudTable
          todosLosRegistros={todosLosObjetos}
          tableHeaders={processedTableHeaders}
          loading={loading}
          idField={idField}
          expandEnabled={expandEnabled}
          subRowsField={subRowsField}
          subRowHeaders={subRowHeaders}
          selectedSort={selectedSort}
          selectedAscOrDesc={selectedAscOrDesc}
          onSort={handleSort}
        />

        <Pagination
          perPage={pageSize}
          totalRows={totalRows}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: crudColors.bg,
  },
  tableContainer: {
    flex: 1,
    backgroundColor: crudColors.bg,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
});
