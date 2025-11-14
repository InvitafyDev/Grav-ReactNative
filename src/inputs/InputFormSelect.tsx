import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import {
  crudColors,
  fontSize,
  borderRadius,
  borderWidth,
  colors,
} from '../theme/typography';

export interface SelectOption {
  value: any;
  label: string;
}

export interface InputFormSelectProps {
  value: SelectOption | null;
  onChange: (value: SelectOption | null) => void;
  onClear?: () => void;
  options: SelectOption[];
  disabled?: boolean;
  label: string;
  showPlusIcon?: boolean;
  onPlusClick?: () => void;
  placeholder?: string;
}

export const InputFormSelect: React.FC<InputFormSelectProps> = ({
  value,
  onChange,
  onClear = () => {},
  options = [],
  disabled = false,
  label,
  showPlusIcon = false,
  onPlusClick = () => {},
  placeholder = 'Seleccione una opción',
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (option: SelectOption) => {
    onChange(option);
    setModalVisible(false);
  };

  const handleClear = () => {
    onChange(null);
    onClear();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.selectRow}>
        <TouchableOpacity
          style={[styles.selectButton, disabled && styles.selectButtonDisabled]}
          onPress={() => !disabled && setModalVisible(true)}
          disabled={disabled}
        >
          <Text
            style={[
              styles.selectText,
              !value && styles.placeholderText,
              disabled && styles.disabledText,
            ]}
          >
            {value ? value.label : placeholder}
          </Text>

          {value && !disabled && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            >
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.chevron}>▼</Text>
        </TouchableOpacity>

        {showPlusIcon && (
          <TouchableOpacity
            style={[styles.plusButton, disabled && styles.plusButtonDisabled]}
            onPress={onPlusClick}
            disabled={disabled}
          >
            <Text style={styles.plusIcon}>+</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item, index) => `${item.value}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    value?.value === item.value && styles.optionItemSelected,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      value?.value === item.value && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {value?.value === item.value && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
              style={styles.optionsList}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    width: '100%',
  },
  label: {
    fontSize: fontSize.base,
    color: crudColors.neutral,
    marginBottom: 4,
  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    borderRadius: borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: crudColors.bg,
    minHeight: 40,
  },
  selectButtonDisabled: {
    opacity: 0.5,
  },
  selectText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: crudColors.neutral,
  },
  placeholderText: {
    color: '#9ca3af',
  },
  disabledText: {
    opacity: 0.6,
  },
  clearButton: {
    padding: 4,
    marginRight: 4,
  },
  clearIcon: {
    fontSize: 16,
    color: crudColors.neutral,
  },
  chevron: {
    fontSize: 12,
    color: crudColors.neutral,
    marginLeft: 4,
  },
  plusButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonDisabled: {
    opacity: 0.5,
  },
  plusIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: crudColors.neutral,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: crudColors.bg,
    borderRadius: borderRadius.md,
    width: '100%',
    maxHeight: '70%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: crudColors.neutral,
  },
  modalClose: {
    fontSize: 24,
    color: crudColors.neutral,
    fontWeight: '600',
  },
  optionsList: {
    maxHeight: 400,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  optionItemSelected: {
    backgroundColor: '#f0f9ff',
  },
  optionText: {
    fontSize: fontSize.base,
    color: '#000',
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
