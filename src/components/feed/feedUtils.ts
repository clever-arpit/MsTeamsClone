export const getInitials = (firstName?: string, lastName?: string) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

export const formatCompactNumber = (value: number) => {
  if (value > 999) return `${(value / 1000).toFixed(1)}k`;
  return String(value);
};
