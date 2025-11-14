// Font Families
export const fontFamily = {
  base: 'mundial',
  heading: 'mundial',
  mono: 'Courier New',
};

// Font Sizes (en React Native usa números directos, no rem)
export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

// Font Weights (como strings para React Native)
export const fontWeight = {
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

// Line Heights
export const lineHeight = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

// Border Radius
export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

// Border Width
export const borderWidth = {
  thin: 1,
  normal: 1.5,
  thick: 2,
  extra: 3,
};

// CRUD Typography
export const crudTypography = {
  title: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
  },
  header: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
  },
  cell: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.light,
    lineHeight: lineHeight.normal,
  },
  button: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
  },
  filter: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
  },
};

// CRUD Colors
export const crudColors = {
  bg: '#ffffff',
  button: '#fe6b91',
  neutral: '#6b7280',
  light: '#f5f5f549',
  border: 'rgba(107, 114, 128, 0.43)',
  tooltip: '#313131',
};

// Additional Colors (from your modal)
export const colors = {
  primary: '#10b981',
  primaryLight: '#6ee7b7',
  danger: '#ef4444',
  border: '#e2e8f0',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  white: '#ffffff',
  black: '#000000',
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
};
