import DeviceInfoLib from 'react-native-device-info';

export const deviceInfoManager = async () => {
  const appVersion = DeviceInfoLib.getVersion();
  const deviceUUID = await DeviceInfoLib.getUniqueId();
  const deviceName = DeviceInfoLib.getModel();
  const deviceBundleId = DeviceInfoLib.getBundleId();
  return { deviceUUID, appVersion, deviceName, deviceBundleId };
};
