import { createMMKV } from 'react-native-mmkv';
export const SecureStorage = createMMKV();
// {
//   id: `user-${deviceUUID}-storage`,
//   path: `${Config.STORAGE_BUCKET}/storage`,
//   encryptionKey: 'ezeetel',
//   mode: 'multi-process',
//   readOnly: false,
// }
