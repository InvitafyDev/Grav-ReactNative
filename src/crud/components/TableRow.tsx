import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import type { TableHeader } from '../interfaces';
import { CellRenderer } from '../cells/CellRenderer';
import { crudColors, borderWidth } from '../../theme/typography';

interface TableRowProps {
  item: any;
  tableHeaders: TableHeader[];
  idField: string;
  expandEnabled: boolean;
  subRowsField: string;
  subRowHeaders?: TableHeader[];
  onImageClick?: (src: string) => void;
  renderSubRows?: (subRows: any[]) => React.ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({
  item,
  tableHeaders,
  idField,
  expandEnabled,
  subRowsField,
  subRowHeaders,
  onImageClick,
  renderSubRows,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubRows = expandEnabled && item[subRowsField] && item[subRowsField].length > 0;

  return (
    <>
      <View style={styles.row}>
        {expandEnabled && (
          <View style={styles.expandCell}>
            {hasSubRows && (
              <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                style={styles.expandButton}
                activeOpacity={0.7}
              >
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={[
                    styles.chevronIcon,
                    isExpanded && styles.chevronExpanded,
                  ]}
                >
                  <Polyline
                    points="9 18 15 12 9 6"
                    stroke={crudColors.neutral}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            )}
          </View>
        )}

        {tableHeaders.map((header, index) => {
          const columnStyle = header.width
            ? { width: header.width }
            : { flex: header.flex ?? 1 };

          return (
            <View key={index} style={[styles.cellContainer, columnStyle]}>
              <CellRenderer
                item={item}
                header={header}
                idField={idField}
                onImageClick={onImageClick}
              />
            </View>
          );
        })}
      </View>

      {isExpanded && hasSubRows && renderSubRows && (
        <View style={styles.subRowsContainer}>
          {renderSubRows(item[subRowsField])}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: borderWidth.thin,
    borderBottomColor: crudColors.border,
    backgroundColor: crudColors.bg,
  },
  expandCell: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandButton: {
    padding: 8,
  },
  chevronIcon: {
    transform: [{ rotate: '0deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  cellContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  subRowsContainer: {
    backgroundColor: crudColors.light,
  },
});
