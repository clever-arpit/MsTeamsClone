import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import CustomText from './CustomText';
import { useTheme } from '../hooks/ThemeContext';
import CustomModal from './CustomModal';

export type GlobalAlertOptions = {
  image?: ImageSourcePropType;
  title?: string;
  message?: string;
  imageColor?: string;
  buttonText?: string;
  timeout?: number;
  onPress?: () => void;
  handleClose?: () => void;
};

let externalShowAlert: ((options: GlobalAlertOptions) => void) | undefined;

const ShowAlert: React.FC = () => {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<GlobalAlertOptions>({});

  const show = (options: GlobalAlertOptions) => {
    const time = options.timeout ?? 0;
    setData(options);
    setTimeout(() => setVisible(true), time);
  };

  const hide = () => setVisible(false);

  useEffect(() => {
    externalShowAlert = show;
  }, []);

  const handleClose = () => {
    data.handleClose?.();
    hide();
  };

  return (
    <CustomModal
      title={data.title}
      visible={visible}
      onClose={handleClose}
      offsetTop={1}
    >
      <View style={styles.container}>
        {data.image && (
          <Image
            source={data?.image}
            style={[styles.image, { tintColor: data?.imageColor }]}
          />
        )}
        {data?.message && (
          <CustomText
            text={data?.message}
            fontSize={15}
            color={colors.text}
            customStyle={{ textAlign: 'center' }}
          />
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.btn_background }]}
          onPress={() => {
            handleClose();
            data?.onPress?.();
          }}
        >
          <CustomText
            text={data?.buttonText || 'OK'}
            fontSize={15}
            color={colors.btn_color}
          />
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export const triggerAlert = (options: GlobalAlertOptions) => {
  if (externalShowAlert) externalShowAlert(options);
  else console.warn('ShowAlert not mounted yet');
};

export default ShowAlert;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 22,
    paddingVertical: 12,
  },
  modalContainer: {
    padding: 20,
    borderRadius: 20,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  button: {
    padding: 10,
    borderRadius: 12,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
