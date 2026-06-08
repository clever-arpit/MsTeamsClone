// Spacing scale (based on 8px base unit)
export const SPACING = {
  XS: 4,      // 4px
  S: 8,       // 8px
  SM: 12,     // 12px
  M: 16,      // 16px
  L: 24,      // 24px
  XL: 32,     // 32px
  XXL: 48,    // 48px
};

// Common padding/margin combinations
export const PADDING = {
  HORIZONTAL_M: { paddingHorizontal: SPACING.M },
  HORIZONTAL_L: { paddingHorizontal: SPACING.L },
  VERTICAL_M: { paddingVertical: SPACING.M },
  VERTICAL_L: { paddingVertical: SPACING.L },
  ALL_M: { padding: SPACING.M },
  ALL_L: { padding: SPACING.L },
};

export const MARGIN = {
  HORIZONTAL_M: { marginHorizontal: SPACING.M },
  HORIZONTAL_L: { marginHorizontal: SPACING.L },
  VERTICAL_M: { marginVertical: SPACING.M },
  VERTICAL_L: { marginVertical: SPACING.L },
  ALL_M: { margin: SPACING.M },
  ALL_L: { margin: SPACING.L },
};
