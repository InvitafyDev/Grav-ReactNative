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

export interface InputFormTextAreaProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  disabled?: boolean;
  obligatory?: boolean;
  rows?: number;
  icon?: React.ReactNode;
}

export const InputFormTextArea: React.FC<InputFormTextAreaProps> = ({
  value,
  onChangeText,
  label,
  disabled = false,
  obligatory = false,
  rows = 4,
  icon = null,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, labelPosition]);

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
    <View style={styles.container}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, disabled && styles.inputDisabled]}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          multiline={true}
          numberOfLines={rows}
          textAlignVertical="top"
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
    alignItems: 'flex-start',
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
    marginTop: 12,
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
    minHeight: 80,
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
