import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

export const ToastMessage = (
  title: string,
  message: string,
  type: ToastType = 'success',
): void => {
  Toast.show({
    type,
    text1: title,
    text2: message,
  });
};

export default ToastMessage;
