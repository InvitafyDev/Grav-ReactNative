import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Svg, { Path, G } from 'react-native-svg';
import {
  crudColors,
  fontSize,
  borderRadius,
  borderWidth,
  colors,
} from '../theme/typography';

export interface InputFormDateProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label: string;
  disabled?: boolean;
  obligatory?: boolean;
  icon?: React.ReactNode;
  noMarginTop?: boolean;
}

export const InputFormDate: React.FC<InputFormDateProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  obligatory = false,
  icon = null,
  noMarginTop = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, labelPosition]);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      // iOS
      if (event.type === 'set' && selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const handleIOSConfirm = () => {
    if (tempDate) {
      onChange(tempDate);
    }
    setShowPicker(false);
    setTempDate(null);
  };

  const handleIOSCancel = () => {
    setShowPicker(false);
    setTempDate(null);
  };

  const handlePress = () => {
    if (disabled) return;
    setIsFocused(true);
    setTempDate(value || new Date());
    setShowPicker(true);
  };

  const CalendarIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <G>
        <Path
          d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
          fill={crudColors.neutral}
        />
      </G>
    </Svg>
  );

  const labelStyle = {
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -10],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    backgroundColor: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', crudColors.bg],
    }),
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={disabled}
        style={[styles.container, noMarginTop && styles.noMarginTop]}
      >
        {icon && <View style={styles.iconWrapper}>{icon}</View>}

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, disabled && styles.inputDisabled]}
            value={formatDate(value)}
            editable={false}
            pointerEvents="none"
          />

          <Animated.Text style={[styles.label, labelStyle]} pointerEvents="none">
            {label}
            {obligatory && <Text style={styles.requiredMark}> *</Text>}
          </Animated.Text>

          <View style={styles.calendarIconWrapper}>
            <CalendarIcon />
          </View>
        </View>
      </TouchableOpacity>

      {Platform.OS === 'ios' && showPicker && (
        <View style={styles.iosPickerContainer}>
          <View style={styles.iosPickerHeader}>
            <TouchableOpacity onPress={handleIOSCancel}>
              <Text style={styles.iosPickerButton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleIOSConfirm}>
              <Text style={[styles.iosPickerButton, styles.iosPickerConfirm]}>Confirmar</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            value={tempDate || new Date()}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            locale="es-ES"
          />
        </View>
      )}

      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={tempDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          locale="es-ES"
        />
      )}
    </>
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
  noMarginTop: {
    marginTop: 0,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 5,
    fontSize: fontSize.base,
    color: crudColors.neutral,
    minHeight: 40,
  },
  inputDisabled: {
    opacity: 0.5,
  },
  label: {
    position: 'absolute',
    left: 4,
    color: crudColors.neutral,
    paddingHorizontal: 4,
  },
  requiredMark: {
    color: colors.danger,
  },
  calendarIconWrapper: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosPickerContainer: {
    backgroundColor: crudColors.bg,
    borderTopWidth: 1,
    borderTopColor: crudColors.neutral,
    marginTop: 10,
  },
  iosPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: crudColors.neutral,
  },
  iosPickerButton: {
    fontSize: fontSize.base,
    color: colors.primary,
  },
  iosPickerConfirm: {
    fontWeight: '600',
  },
});
