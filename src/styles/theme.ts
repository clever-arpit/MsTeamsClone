import { COLORS, DARK_COLORS } from './colors';
import { SPACING } from './spacing';
import { TYPOGRAPHY } from './typography';

export const lightTheme = {
  colors: COLORS,
  spacing: SPACING,
  typography: TYPOGRAPHY,
};

export const darkTheme = {
  colors: { ...COLORS, ...DARK_COLORS },
  spacing: SPACING,
  typography: TYPOGRAPHY,
};

export const defaultTheme = lightTheme;
