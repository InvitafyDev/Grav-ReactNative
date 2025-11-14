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

export interface InputFormDateAndHoursProps {
  value: string; // ISO datetime string
  onChange: (datetime: string) => void;
  label: string;
  disabled?: boolean;
  obligatory?: boolean;
  icon?: React.ReactNode;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const InputFormDateAndHours: React.FC<InputFormDateAndHoursProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  obligatory = false,
  icon = null,
  minimumDate,
  maximumDate,
}) => {
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  // Convert string to Date object
  const dateValue = value ? new Date(value) : new Date();

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDate(false);
    }

    if (event.type === 'set' && selectedDate) {
      // Keep the time part from the original value
      const currentDate = value ? new Date(value) : new Date();
      selectedDate.setHours(currentDate.getHours());
      selectedDate.setMinutes(currentDate.getMinutes());
      onChange(selectedDate.toISOString());

      // On Android, show time picker after date is selected
      if (Platform.OS === 'android') {
        setTimeout(() => setShowTime(true), 100);
      }
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTime(false);

    if (event.type === 'set' && selectedTime) {
      onChange(selectedTime.toISOString());
    }
  };

  const formatDisplayDateTime = (dateString: string): string => {
    if (!dateString) return 'Selecciona fecha y hora';
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const showDatepicker = () => {
    if (!disabled) {
      setShowDate(true);
    }
  };

  const showTimepicker = () => {
    if (!disabled) {
      setShowTime(true);
    }
  };

  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}

      <View style={styles.inputWrapper}>
        <View style={styles.dateTimeRow}>
          <TouchableOpacity
            style={[styles.dateButton, disabled && styles.dateButtonDisabled]}
            onPress={showDatepicker}
            disabled={disabled}
          >
            <Text style={[styles.dateText, !value && styles.placeholderText]}>
              {formatDisplayDateTime(value)}
            </Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={[styles.timeButton, disabled && styles.dateButtonDisabled]}
              onPress={showTimepicker}
              disabled={disabled}
            >
              <Text style={styles.clockIcon}>🕐</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.label}>
          {label}
          {obligatory && <Text style={styles.requiredMark}> *</Text>}
        </Text>
      </View>

      {showDate && (
        <DateTimePicker
          value={dateValue}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          textColor={crudColors.neutral}
        />
      )}

      {showTime && (
        <DateTimePicker
          value={dateValue}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
          textColor={crudColors.neutral}
        />
      )}

      {/* iOS: Show close buttons when pickers are visible */}
      {(showDate || showTime) && Platform.OS === 'ios' && (
        <View style={styles.iosPickerContainer}>
          <View style={styles.iosPickerHeader}>
            <TouchableOpacity
              onPress={() => {
                setShowDate(false);
                setShowTime(false);
              }}
            >
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
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    minHeight: 40,
  },
  timeButton: {
    padding: 5,
    minHeight: 40,
    justifyContent: 'center',
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
  clockIcon: {
    fontSize: 18,
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
