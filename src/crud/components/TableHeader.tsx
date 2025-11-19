import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Svg, { Path, Polyline } from 'react-native-svg';
import type { TableHeader as TableHeaderType } from '../interfaces';
import { crudTypography, crudColors, borderWidth } from '../../theme/typography';

interface TableHeaderProps {
  tableHeaders: TableHeaderType[];
  expandEnabled: boolean;
  selectedSort: string;
  selectedAscOrDesc: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  tableHeaders,
  expandEnabled,
  selectedSort,
  selectedAscOrDesc,
  onSort,
}) => {
  return (
    <View style={styles.headerContainer}>
      {expandEnabled && <View style={styles.expandColumn} />}

      {tableHeaders.map((header, index) => {
        if (header.biSort) {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.headerCell,
                styles.sortable,
                { flex: 1 },
                header.align === 'left' && styles.alignLeft,
                header.align === 'right' && styles.alignRight,
                header.align === 'center' && styles.alignCenter,
              ]}
              onPress={() => onSort(header.campo)}
              activeOpacity={0.7}
            >
              <Text style={styles.headerText}>{header.titulo}</Text>
              {selectedSort === header.campo && (
                <View style={styles.sortIcon}>
                  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    {selectedAscOrDesc === 'asc' ? (
                      <Polyline
                        points="6 9 12 15 18 9"
                        stroke={crudColors.neutral}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <Polyline
                        points="18 15 12 9 6 15"
                        stroke={crudColors.neutral}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </Svg>
                </View>
              )}
            </TouchableOpacity>
          );
        }

        return (
          <View
            key={index}
            style={[
              styles.headerCell,
              { flex: 1 },
              header.align === 'left' && styles.alignLeft,
              header.align === 'right' && styles.alignRight,
              header.align === 'center' && styles.alignCenter,
            ]}
          >
            <Text style={styles.headerText}>{header.titulo}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: crudColors.bg,
    borderBottomWidth: borderWidth.normal,
    borderBottomColor: crudColors.border,
    paddingVertical: 12,
  },
  expandColumn: {
    width: 50,
  },
  headerCell: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  sortable: {
    gap: 4,
  },
  headerText: {
    ...crudTypography.header,
    color: crudColors.neutral,
  },
  sortIcon: {
    marginLeft: 4,
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  alignCenter: {
    justifyContent: 'center',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
});
