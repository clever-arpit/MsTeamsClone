// Font sizes
export const FONT_SIZES = {
  XS: 12,
  S: 14,
  M: 16,
  L: 18,
  XL: 20,
  XXL: 24,
  XXXL: 32,
};

// Font weights
export const FONT_WEIGHTS = {
  LIGHT: '300',
  NORMAL: '400',
  MEDIUM: '500',
  SEMIBOLD: '600',
  BOLD: '700',
} as const;

// Font families (customize based on your fonts)
export const FONT_FAMILIES = {
  REGULAR: 'System',
  MEDIUM: 'System',
  BOLD: 'System',
};

// Typography presets
export const TYPOGRAPHY = {
  H1: {
    fontSize: FONT_SIZES.XXXL,
    fontWeight: FONT_WEIGHTS.BOLD,
    lineHeight: 40,
  },
  H2: {
    fontSize: FONT_SIZES.XXL,
    fontWeight: FONT_WEIGHTS.BOLD,
    lineHeight: 32,
  },
  H3: {
    fontSize: FONT_SIZES.XL,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    lineHeight: 28,
  },
  SUBTITLE1: {
    fontSize: FONT_SIZES.L,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    lineHeight: 24,
  },
  SUBTITLE2: {
    fontSize: FONT_SIZES.M,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    lineHeight: 22,
  },
  BODY1: {
    fontSize: FONT_SIZES.M,
    fontWeight: FONT_WEIGHTS.NORMAL,
    lineHeight: 22,
  },
  BODY2: {
    fontSize: FONT_SIZES.S,
    fontWeight: FONT_WEIGHTS.NORMAL,
    lineHeight: 20,
  },
  CAPTION: {
    fontSize: FONT_SIZES.XS,
    fontWeight: FONT_WEIGHTS.NORMAL,
    lineHeight: 16,
  },
  BUTTON: {
    fontSize: FONT_SIZES.M,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    lineHeight: 22,
  },
};
