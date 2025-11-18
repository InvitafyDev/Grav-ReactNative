import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  crudColors,
  fontSize,
  borderRadius,
  borderWidth,
} from '../theme/typography';

export interface SelectOption {
  value: any;
  label: string;
}

export interface InputFormSelectProps {
  value: SelectOption | null;
  items: SelectOption[];
  onChange: (item: SelectOption | null) => void;
  onClear?: () => void;
  label: string;
  disabled?: boolean;
  showPlusIcon?: boolean;
  onPlusClick?: () => void;
  placeholder?: string;
  noMarginTop?: boolean;
}

export const InputFormSelect: React.FC<InputFormSelectProps> = ({
  value,
  items,
  onChange,
  onClear,
  label,
  disabled = false,
  showPlusIcon = false,
  onPlusClick,
  placeholder = 'Seleccione una opción',
  noMarginTop = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (item: SelectOption) => {
    onChange(item);
    setIsModalVisible(false);
    setSearchQuery('');
  };

  const handleClear = () => {
    onChange(null);
    onClear?.();
  };

  const handlePlusClick = () => {
    if (onPlusClick && !disabled) {
      onPlusClick();
    }
  };

  return (
    <View style={[styles.container, noMarginTop && styles.noMarginTop]}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.selectWithButton}>
        <TouchableOpacity
          style={[styles.selectButton, disabled && styles.selectButtonDisabled]}
          onPress={() => !disabled && setIsModalVisible(true)}
          disabled={disabled}
        >
          <Text
            style={[
              styles.selectText,
              !value && styles.placeholderText,
            ]}
            numberOfLines={1}
          >
            {value?.label || placeholder}
          </Text>

          <View style={styles.iconRow}>
            {value && !disabled && (
              <TouchableOpacity
                onPress={handleClear}
                style={styles.clearButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M18 6L6 18M6 6l12 12"
                    stroke={crudColors.neutral}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            )}

            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <Path
                d="M6 9l6 6 6-6"
                stroke={crudColors.neutral}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </TouchableOpacity>

        {showPlusIcon && (
          <TouchableOpacity
            style={[styles.plusButton, disabled && styles.plusButtonDisabled]}
            onPress={handlePlusClick}
            disabled={disabled}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M5 12h14M12 5v14"
                stroke={disabled ? crudColors.neutral + '80' : crudColors.neutral}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setIsModalVisible(false);
          setSearchQuery('');
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            setIsModalVisible(false);
            setSearchQuery('');
          }}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  setSearchQuery('');
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M18 6L6 18M6 6l12 12"
                    stroke={crudColors.neutral}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={styles.searchIcon}>
                <Path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke={crudColors.neutral}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
                placeholderTextColor={crudColors.neutral + '80'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M18 6L6 18M6 6l12 12"
                      stroke={crudColors.neutral}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </TouchableOpacity>
              )}
            </View>

            <ScrollView style={styles.scrollView}>
              {filteredItems.length > 0 ? (
                <FlatList
                  data={filteredItems}
                  keyExtractor={(item, index) => `${item.value}-${index}`}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.option,
                        value?.value === item.value && styles.selectedOption,
                      ]}
                      onPress={() => handleSelect(item)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          value?.value === item.value && styles.selectedOptionText,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                  scrollEnabled={false}
                />
              ) : (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>No se encontraron resultados</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
  },
  noMarginTop: {
    marginTop: 0,
  },
  label: {
    fontSize: fontSize.base,
    color: crudColors.neutral,
    marginBottom: 4,
  },
  selectWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    borderRadius: borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    minHeight: 46,
  },
  selectButtonDisabled: {
    opacity: 0.5,
  },
  selectText: {
    flex: 1,
    fontSize: fontSize.xs,
    color: crudColors.neutral,
  },
  placeholderText: {
    color: crudColors.neutral,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clearButton: {
    padding: 2,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: borderRadius.md,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: '#000000',
  },
  scrollView: {
    maxHeight: 400,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  selectedOption: {
    backgroundColor: '#000000',
  },
  optionText: {
    fontSize: fontSize.xs,
    color: '#000000',
  },
  selectedOptionText: {
    color: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 8,
  },
  searchIcon: {
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.xs,
    color: crudColors.neutral,
    padding: 0,
  },
  noResults: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: fontSize.xs,
    color: crudColors.neutral,
    opacity: 0.6,
  },
});
