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
import Svg, { Path } from 'react-native-svg';
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

  const EyeIcon = ({ visible }: { visible: boolean }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      {visible ? (
        <Path
          d="M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
          fill={crudColors.neutral}
        />
      ) : (
        <Path
          d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
          fill={crudColors.neutral}
        />
      )}
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

          <Animated.Text style={[styles.label, labelStyle]} pointerEvents="none">
            {label}
            {obligatory && <Text style={styles.requiredMark}> *</Text>}
          </Animated.Text>

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <EyeIcon visible={showPassword} />
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
    justifyContent: 'center',
    alignItems: 'center',
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
