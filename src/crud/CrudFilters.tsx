import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';
import type { FiltrosI } from './interfaces';
import { InputFormText } from '../inputs/InputFormText';
import { InputFormNumber } from '../inputs/InputFormNumber';
import { InputFormBool } from '../inputs/InputFormBool';
import { InputFormDate } from '../inputs/InputFormDate';
import { InputFormDateAndHours } from '../inputs/InputFormDateAndHours';
import { InputFormSelect } from '../inputs/InputFormSelect';
import { crudColors, crudTypography, borderRadius, borderWidth, spacing } from '../theme/typography';

interface CrudFiltersProps {
  Filtros: FiltrosI[];
  PageSize: number;
  showAddButton?: boolean;
  showImportButton?: boolean;
  Titulo_Crud: string;
  onFilter: (filters: FiltrosI[]) => void;
  onAdd: () => void;
  onImport?: () => void;
  onPageSizeChange: (size: number) => void;
}

export const CrudFilters: React.FC<CrudFiltersProps> = ({
  Filtros,
  PageSize,
  showAddButton = true,
  showImportButton = false,
  Titulo_Crud,
  onFilter,
  onAdd,
  onImport,
  onPageSizeChange,
}) => {
  const [filters, setFilters] = useState<FiltrosI[]>(Filtros);
  const [showFilters, setShowFilters] = useState(false);
  const [pageSize, setPageSize] = useState(PageSize.toString());
  const [selectOptions, setSelectOptions] = useState<{ [key: number]: { value: any; label: string }[] }>({});
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  useEffect(() => {
    setFilters(Filtros);
  }, [Filtros]);

  useEffect(() => {
    const loadSelectOptions = async () => {
      setIsLoadingOptions(true);
      const options: { [key: number]: { value: any; label: string }[] } = {};

      for (let i = 0; i < filters.length; i++) {
        const filter = filters[i];
        if (filter.tipo === 'select' && filter.service) {
          try {
            options[i] = await filter.service();
          } catch (error) {
            options[i] = [];
          }
        }
      }

      setSelectOptions(options);
      setIsLoadingOptions(false);
    };

    loadSelectOptions();
  }, []);

  const handleFilterChange = (index: number, value: any) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], value };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    const size = parseInt(pageSize);
    if (!isNaN(size) && size > 0) {
      onPageSizeChange(size);
    }
    onFilter(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = filters.map((filter) => ({
      ...filter,
      value: filter.tipo === 'bool' ? false : null,
    }));
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  const renderFilter = (filter: FiltrosI, index: number) => {
    switch (filter.tipo) {
      case 'text':
        return (
          <InputFormText
            key={index}
            label={filter.label}
            value={filter.value || ''}
            onChangeText={(text) => handleFilterChange(index, text)}
            noMarginTop
          />
        );

      case 'number':
        return (
          <InputFormNumber
            key={index}
            label={filter.label}
            value={filter.value || 0}
            onChangeText={(value) => handleFilterChange(index, value)}
          />
        );

      case 'bool':
        return (
          <InputFormBool
            key={index}
            label={filter.label}
            value={filter.value || false}
            onValueChange={(value) => handleFilterChange(index, value)}
          />
        );

      case 'date':
        return (
          <InputFormDate
            key={index}
            label={filter.label}
            value={filter.value}
            onChange={(date) => handleFilterChange(index, date)}
            noMarginTop
          />
        );

      case 'datetime':
        return (
          <InputFormDateAndHours
            key={index}
            label={filter.label}
            value={filter.value}
            onChange={(datetime) => handleFilterChange(index, datetime)}
            noMarginTop
          />
        );

      case 'select':
        const options = filter.service
          ? selectOptions[index] || []
          : filter.options || [];

        return (
          <InputFormSelect
            key={index}
            label={filter.label}
            value={filter.value}
            items={options}
            onChange={(item) => handleFilterChange(index, item)}
            noMarginTop
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{Titulo_Crud}</Text>

        <View style={styles.actions}>
          {showAddButton && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onAdd}
              activeOpacity={0.7}
            >
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Line
                  x1="12"
                  y1="5"
                  x2="12"
                  y2="19"
                  stroke={crudColors.neutral}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <Line
                  x1="5"
                  y1="12"
                  x2="19"
                  y2="12"
                  stroke={crudColors.neutral}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          )}

          {showImportButton && onImport && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onImport}
              activeOpacity={0.7}
            >
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                  stroke={crudColors.neutral}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M7 10l5 5 5-5"
                  stroke={crudColors.neutral}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Line
                  x1="12"
                  y1="15"
                  x2="12"
                  y2="3"
                  stroke={crudColors.neutral}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          )}

          {filters.length > 0 && (
            <TouchableOpacity
              style={[styles.actionButton, showFilters && styles.activeButton]}
              onPress={() => setShowFilters(!showFilters)}
              activeOpacity={0.7}
            >
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Line
                  x1="4"
                  y1="6"
                  x2="20"
                  y2="6"
                  stroke={showFilters ? crudColors.button : crudColors.neutral}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <Line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  stroke={showFilters ? crudColors.button : crudColors.neutral}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <Line
                  x1="4"
                  y1="18"
                  x2="20"
                  y2="18"
                  stroke={showFilters ? crudColors.button : crudColors.neutral}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[...filters, { tipo: 'pageSize' as const }]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              if ('tipo' in item && item.tipo === 'pageSize') {
                return (
                  <View style={styles.filterItem}>
                    <InputFormText
                      label="Mostrando:"
                      value={pageSize}
                      onChangeText={setPageSize}
                      keyboardType="numeric"
                      noMarginTop
                    />
                  </View>
                );
              }
              return (
                <View style={styles.filterItem}>
                  {renderFilter(item as FiltrosI, index)}
                </View>
              );
            }}
            contentContainerStyle={styles.filtersGrid}
          />

          <View style={styles.filterActions}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={handleClearFilters}
              activeOpacity={0.7}
            >
              <Text style={styles.filterButtonText}>Limpiar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterButton, styles.primaryButton]}
              onPress={handleApplyFilters}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterButtonText, styles.primaryButtonText]}>
                Filtrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: crudColors.bg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    ...crudTypography.title,
    color: crudColors.neutral,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: crudColors.bg,
  },
  activeButton: {
    borderColor: crudColors.button,
  },
  filtersContainer: {
    gap: spacing.md,
  },
  filtersGrid: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  filterItem: {
    width: 200,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    backgroundColor: crudColors.bg,
  },
  primaryButton: {
    backgroundColor: crudColors.button,
    borderColor: crudColors.button,
  },
  filterButtonText: {
    ...crudTypography.button,
    color: crudColors.neutral,
  },
  primaryButtonText: {
    color: crudColors.bg,
  },
});
