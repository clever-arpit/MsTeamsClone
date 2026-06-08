import { Alert, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { pick, types } from '@react-native-documents/picker';
import Compressor from 'react-native-compressor'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Icons from '../utils/Icons';
import { delay, openSettings } from '../utils/Helper';
import { PickedImage } from '../types/DataType';
import { triggerAlert } from './triggerAlert';
import { requestMicPermission } from '../utils/Permissions';

const toLocalPath = (uri: string | undefined) =>
  Platform.OS === 'ios' ? (uri || '').replace(/^file:\/\//, '') : uri || '';

const fileSize = async (path: string) => {
  const s = await ReactNativeBlobUtil.fs.stat(path);
  return Number(s.size || 0);
};

const MAX_SIZE = 5 * 1024 * 1024;

export const handlePermissionDenied = () => {
  triggerAlert({
    title: 'Permission Required',
    message:
      'Please allow required permissions from settings to continue using this feature.',
    image: Icons.galleryIcon,
    onPress: openSettings,
    buttonText: 'Open Settings',
  });
};

const getPermission = (type: 'camera' | 'gallery' | 'contacts') => {
  if (Platform.OS === 'ios') {
    switch (type) {
      case 'camera':
        return PERMISSIONS.IOS.CAMERA;
      case 'gallery':
        return PERMISSIONS.IOS.PHOTO_LIBRARY;
      case 'contacts':
        return PERMISSIONS.IOS.CONTACTS;
    }
  } else {
    switch (type) {
      case 'camera':
        return PERMISSIONS.ANDROID.CAMERA;
      case 'gallery': {
        const version = Number(Platform.Version);
        return version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      }
      case 'contacts':
        return PERMISSIONS.ANDROID.READ_CONTACTS;
    }
  }
};

export const requestPermission = async (
  type: 'camera' | 'gallery' | 'contacts',
) => {
  const permission = getPermission(type);
  if (!permission) return false;

  const result = await check(permission);

  if (result === RESULTS.GRANTED) return true;

  if (result === RESULTS.BLOCKED) {
    handlePermissionDenied();
    return false;
  }

  if (result === RESULTS.DENIED) {
    const req = await request(permission);

    if (req === RESULTS.GRANTED) return true;

    if (req === RESULTS.BLOCKED) {
      handlePermissionDenied();
      return false;
    }

    return false;
  }

  return false;
};


export function generateRandomFileName(mimeType?: string): string {
  const randomString = Math.random().toString(36).substring(2, 10);
  const randomNumber = Math.floor(Math.random() * 1000);

  const mimeToExt: Record<string, string> = {
    // Images
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/heic': 'heic',

    // Videos
    'video/mp4': 'mp4',
    'video/quicktime': 'mov',
    'video/x-matroska': 'mkv',
    'video/webm': 'webm',
    'video/3gpp': '3gp',

    // Audio
    'audio/mpeg': 'mp3',
    'audio/mp4': 'm4a',
    'audio/wav': 'wav',
    'audio/aac': 'aac',

    // Documents
    'application/pdf': 'pdf',
  };

  const extension = mimeType
    ? mimeToExt[mimeType.toLowerCase()] || 'file'
    : 'file';

  return `Ezeetel_${randomString}${randomNumber}.${extension}`;
}

export const openCamera = async () => {
  await delay(600);

  const granted = await requestPermission('camera');
  if (!granted) return;

  try {
    const result = await ImagePicker.openCamera({
      cropping: true,
      mediaType: 'any',
      includeBase64: false,
    });

    const filePath = result?.path;
    if (!filePath) return '';

    const compressed = await Compressor.Image.compress(filePath);
    const finalPath = toLocalPath(compressed);
    const meta = await fileSize(finalPath);

    if (meta <= MAX_SIZE) {
      return {
        name: generateRandomFileName(result?.mime),
        uri: finalPath,
        type: result.mime,
      };
    } else {
      Alert.alert('Alert!', 'File size exceeds 5Mb');
      return '';
    }
  } catch (err) {
    console.log('openCamera error:', err);
  }
};

export const openGallery = async (module = 'any', multiple = false) => {
  await delay(600);

  const granted = await requestPermission('gallery');
  if (!granted) return;

  try {
    const result = await ImagePicker.openPicker({
      multiple,
      mediaType: 'any',
      includeExif: false,
      includeBase64: false,
    });

    const files = Array.isArray(result) ? result : [result];
    const finalFiles: PickedImage[] = [];

    for (const file of files) {
      console.log('file----', file);

      const rawPath = Platform.OS === 'ios' ? `file://${file.path}` : file.path;
      const filePath = toLocalPath(rawPath);

      if (file.mime?.startsWith('image/')) {
        const compressed = await Compressor.Image.compress(filePath, {
          compressionMethod: 'auto',
          output: 'jpg',
          quality: 0.8,
        });

        const finalPath = toLocalPath(compressed);
        const size = await fileSize(finalPath);
        console.log('size====', size);

        if (size <= MAX_SIZE) {
          finalFiles.push({
            name: generateRandomFileName(file?.mime),
            uri: finalPath,
            type: file?.mime,
          });
        }
      } else if (file.mime?.startsWith('video/')) {
        const compressed = await Compressor.Video.compress(filePath, {
          compressionMethod: 'auto',
        });

        const finalPath = toLocalPath(compressed);
        const size = await fileSize(finalPath);
        console.log('size====', size);

        if (module == 'business' ? size <= 1 * 1024 * 1024 : size <= MAX_SIZE) {
          finalFiles.push({
            name: generateRandomFileName(file?.mime),
            uri: finalPath,
            type: file?.mime,
          });
        }
      }
    }

    console.log('finalFiles====', finalFiles);

    return finalFiles;
  } catch (err) {
    console.log('openGallery error:', err);
  }
};

export const openAudioPicker = async () => {
  const granted = await requestPermission('gallery');
  if (!granted) return;

  try {
    const result = await pick({
      allowMultiSelection: false,
      type: [types.audio],
    });

    let singleFile = result[0];

    if (singleFile?.type && singleFile?.size && singleFile?.size <= MAX_SIZE) {
      return {
        name: singleFile?.name || 'Audio',
        uri: singleFile?.uri,
        type: singleFile?.type,
      };
    } else {
      Alert.alert('Alert', 'File size should be less than 5Mb');
    }
  } catch (err) {
    console.log('openAudioPicker error:', err);
  }
};

export const openDocumentPicker = async () => {
  const granted = await requestPermission('gallery');
  if (!granted) return;

  try {
    const result = await pick({
      allowMultiSelection: false,
      type: [types.pdf, types.doc, types.docx, types.xls, types.xlsx],
    });

    let singleFile = result[0];

    if (singleFile?.type && singleFile?.size && singleFile?.size <= MAX_SIZE) {
      return {
        name: singleFile?.name || 'Document',
        uri: singleFile?.uri,
        type: singleFile?.type,
      };
    } else {
      Alert.alert('Alert', 'File size should be less than 1 Mb');
    }
  } catch (err) {
    console.log('openDocumentPicker error:', err);
  }
};
