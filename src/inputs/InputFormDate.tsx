import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {
  crudColors,
  fontSize,
  borderRadius,
  borderWidth,
  colors,
} from '../theme/typography';

export interface InputFormDateProps {
  value: string; // ISO date string (YYYY-MM-DD)
  onChange: (date: string) => void;
  label: string;
  disabled?: boolean;
  obligatory?: boolean;
  icon?: React.ReactNode;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const InputFormDate: React.FC<InputFormDateProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  obligatory = false,
  icon = null,
  minimumDate,
  maximumDate,
}) => {
  const [show, setShow] = useState(false);

  // Convert string to Date object
  const dateValue = value ? new Date(value) : new Date();

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }

    if (event.type === 'set' && selectedDate) {
      // Format date as YYYY-MM-DD
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      onChange(formattedDate);
    }
  };

  const formatDisplayDate = (dateString: string): string => {
    if (!dateString) return 'Selecciona una fecha';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const showDatepicker = () => {
    if (!disabled) {
      setShow(true);
    }
  };

  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}

      <View style={styles.inputWrapper}>
        <TouchableOpacity
          style={[styles.dateButton, disabled && styles.dateButtonDisabled]}
          onPress={showDatepicker}
          disabled={disabled}
        >
          <Text style={[styles.dateText, !value && styles.placeholderText]}>
            {formatDisplayDate(value)}
          </Text>
          <Text style={styles.calendarIcon}>📅</Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          {label}
          {obligatory && <Text style={styles.requiredMark}> *</Text>}
        </Text>
      </View>

      {show && (
        <DateTimePicker
          value={dateValue}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          textColor={crudColors.neutral}
        />
      )}

      {/* iOS: Show close button when picker is visible */}
      {show && Platform.OS === 'ios' && (
        <View style={styles.iosPickerContainer}>
          <View style={styles.iosPickerHeader}>
            <TouchableOpacity onPress={() => setShow(false)}>
              <Text style={styles.iosDoneButton}>Listo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: borderWidth.thin,
    borderColor: crudColors.neutral,
    borderRadius: borderRadius.md,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 31,
    backgroundColor: crudColors.bg,
  },
  iconWrapper: {
    width: 16,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    position: 'relative',
    flex: 1,
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    minHeight: 40,
  },
  dateButtonDisabled: {
    opacity: 0.5,
  },
  dateText: {
    flex: 1,
    fontSize: fontSize.base,
    color: crudColors.neutral,
  },
  placeholderText: {
    color: '#9ca3af',
  },
  calendarIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  label: {
    position: 'absolute',
    left: 4,
    top: -22,
    fontSize: 12,
    color: crudColors.neutral,
    paddingHorizontal: 4,
    backgroundColor: crudColors.bg,
  },
  requiredMark: {
    color: colors.danger,
  },
  iosPickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: crudColors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  iosPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iosDoneButton: {
    fontSize: fontSize.base,
    color: colors.primary,
    fontWeight: '600',
  },
});
