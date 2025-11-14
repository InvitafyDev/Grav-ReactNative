import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import {
  crudColors,
  fontSize,
  borderRadius,
  borderWidth,
  colors,
} from '../theme/typography';

export interface InputFormPasswordProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  disabled?: boolean;
  obligatory?: boolean;
  icon?: React.ReactNode;
  validation?: boolean;
}

interface ValidationResult {
  message: string;
  isValid: boolean;
}

export const InputFormPassword: React.FC<InputFormPasswordProps> = ({
  value,
  onChangeText,
  label,
  disabled = false,
  obligatory = false,
  icon = null,
  validation = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, labelPosition]);

  const validatePassword = (): ValidationResult => {
    if (!value) {
      return { message: '', isValid: true };
    }

    const hasMinLength = value.length >= 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!hasMinLength) {
      return { message: 'Password must be at least 8 characters long', isValid: false };
    }
    if (!hasUpperCase) {
      return { message: 'Password must contain at least one uppercase letter', isValid: false };
    }
    if (!hasLowerCase) {
      return { message: 'Password must contain at least one lowercase letter', isValid: false };
    }
    if (!hasNumbers) {
      return { message: 'Password must contain at least one number', isValid: false };
    }
    if (!hasSpecialChar) {
      return { message: 'Password must contain at least one special character', isValid: false };
    }

    return { message: 'Password is valid', isValid: true };
  };

  const validationResult = validatePassword();

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
            secureTextEntry={!showPassword}
            {...rest}
          />

          <Animated.Text style={[styles.label, labelStyle]}>
            {label}
            {obligatory && <Text style={styles.requiredMark}> *</Text>}
          </Animated.Text>

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {validation && validationResult.message && (
        <Text
          style={[
            styles.validationMessage,
            validationResult.isValid ? styles.validMessage : styles.invalidMessage,
          ]}
        >
          {validationResult.message}
        </Text>
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
  eyeButton: {
    padding: 8,
  },
  eyeIcon: {
    fontSize: 18,
  },
  validationMessage: {
    fontSize: fontSize.sm,
    marginTop: 4,
    color: crudColors.neutral,
  },
  validMessage: {
    color: colors.primary,
  },
  invalidMessage: {
    color: colors.danger,
  },
});
