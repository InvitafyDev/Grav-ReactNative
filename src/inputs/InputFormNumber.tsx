import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TextInputProps,
} from 'react-native';
import {
  crudColors,
  fontSize,
  borderRadius,
  borderWidth,
  colors,
} from '../theme/typography';

export interface InputFormNumberProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  value: number;
  onChangeText: (value: number) => void;
  label: string;
  disabled?: boolean;
  obligatory?: boolean;
  icon?: React.ReactNode;
}

export const InputFormNumber: React.FC<InputFormNumberProps> = ({
  value,
  onChangeText,
  label,
  disabled = false,
  obligatory = false,
  icon = null,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [textValue, setTextValue] = useState(value.toString());
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    setTextValue(value.toString());
  }, [value]);

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || textValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, textValue, labelPosition]);

  const handleChangeText = (text: string) => {
    setTextValue(text);
    const numValue = parseFloat(text);
    if (!isNaN(numValue)) {
      onChangeText(numValue);
    } else if (text === '' || text === '-') {
      onChangeText(0);
    }
  };

  const labelStyle = {
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
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
    <View style={styles.container}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, disabled && styles.inputDisabled]}
          value={textValue}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          keyboardType="numeric"
          {...rest}
        />

        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
          {obligatory && <Text style={styles.requiredMark}> *</Text>}
        </Animated.Text>
      </View>
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
  input: {
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
});
