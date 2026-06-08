// Permission types
export const PERMISSIONS = {
  CAMERA: 'camera',
  PHOTO_LIBRARY: 'photo_library',
  MICROPHONE: 'microphone',
  CONTACTS: 'contacts',
  LOCATION: 'location',
  CALENDAR: 'calendar',
};

// Check if user has permission
export const hasPermission = async (permission: string): Promise<boolean> => {
  // This is a placeholder - implement based on react-native-permissions
  return true;
};

// Request permission
export const requestPermission = async (permission: string): Promise<boolean> => {
  // This is a placeholder - implement based on react-native-permissions
  return true;
};

// Batch request permissions
export const requestPermissions = async (permissions: string[]): Promise<Record<string, boolean>> => {
  const results: Record<string, boolean> = {};
  for (const permission of permissions) {
    results[permission] = await requestPermission(permission);
  }
  return results;
};
