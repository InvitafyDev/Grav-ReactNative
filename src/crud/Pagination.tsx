import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { crudColors, crudTypography, borderRadius, borderWidth, spacing } from '../theme/typography';

interface PaginationProps {
  perPage: number;
  totalRows: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  perPage,
  totalRows,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRows / perPage);
  const start = (currentPage - 1) * perPage;
  const end = Math.min(start + perPage - 1, totalRows - 1);

  const shouldShowPage = (pageNum: number): boolean => {
    if (totalPages <= 7) return true;
    if (pageNum <= 2 || pageNum >= totalPages - 1) return true;
    return Math.abs(pageNum - currentPage) <= 2;
  };

  const renderPageButtons = () => {
    const buttons = [];
    let lastShown = 0;

    for (let i = 1; i <= totalPages; i++) {
      if (shouldShowPage(i)) {
        if (lastShown > 0 && i - lastShown > 1) {
          buttons.push(
            <Text key={`ellipsis-${i}`} style={styles.ellipsis}>
              ...
            </Text>
          );
        }

        buttons.push(
          <TouchableOpacity
            key={i}
            onPress={() => onPageChange(i)}
            style={[styles.pageButton, currentPage === i && styles.activePageButton]}
            activeOpacity={0.7}
          >
            <Text
              style={[styles.pageText, currentPage === i && styles.activePageText]}
            >
              {i}
            </Text>
          </TouchableOpacity>
        );

        lastShown = i;
      }
    }

    return buttons;
  };

  if (totalRows <= perPage) return null;

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => onPageChange(1)}
          disabled={currentPage === 1}
          style={[styles.navButton, currentPage === 1 && styles.disabledButton]}
          activeOpacity={0.7}
        >
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path
              d="M11 17l-5-5 5-5M18 17l-5-5 5-5"
              stroke={currentPage === 1 ? crudColors.neutral + '40' : crudColors.neutral}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={[styles.navButton, currentPage === 1 && styles.disabledButton]}
          activeOpacity={0.7}
        >
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path
              d="M15 18l-6-6 6-6"
              stroke={currentPage === 1 ? crudColors.neutral + '40' : crudColors.neutral}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {renderPageButtons()}

        <TouchableOpacity
          onPress={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={[styles.navButton, currentPage === totalPages && styles.disabledButton]}
          activeOpacity={0.7}
        >
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path
              d="M9 18l6-6-6-6"
              stroke={currentPage === totalPages ? crudColors.neutral + '40' : crudColors.neutral}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          style={[styles.navButton, currentPage === totalPages && styles.disabledButton]}
          activeOpacity={0.7}
        >
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path
              d="M13 17l5-5-5-5M6 17l5-5-5-5"
              stroke={currentPage === totalPages ? crudColors.neutral + '40' : crudColors.neutral}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <Text style={styles.infoText}>
        Mostrando: {start + 1} - {end + 1} de {totalRows} registros
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: crudColors.bg,
  },
  disabledButton: {
    opacity: 0.4,
  },
  pageButton: {
    minWidth: 40,
    height: 40,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: crudColors.bg,
  },
  activePageButton: {
    backgroundColor: crudColors.neutral,
    borderColor: crudColors.neutral,
  },
  pageText: {
    ...crudTypography.button,
    color: crudColors.neutral,
  },
  activePageText: {
    color: crudColors.bg,
  },
  ellipsis: {
    ...crudTypography.cell,
    color: crudColors.neutral,
    paddingHorizontal: spacing.xs,
  },
  infoText: {
    ...crudTypography.cell,
    color: crudColors.neutral,
    marginTop: spacing.xs,
  },
});
