import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import Icons from '../utils/Icons';
import CustomButton from './CustomButton';

interface NoDataFoundProps {
  text?: string;
  onRefresh?: () => void;
  buttonText?: string;
  showImage?: boolean;
}

const DataNotFound: React.FC<NoDataFoundProps> = ({
  text = 'Oops, Data Not Found!',
  onRefresh,
  buttonText = 'Refresh',
  showImage = true,
}) => {
  return (
    <View style={styles.container}>
      {showImage && <Image source={Icons.nodataIcon} style={styles.image} />}
      <CustomText text={text} fontSize={17} />
      {onRefresh && (
        <CustomButton
          title={buttonText}
          onPress={onRefresh}
          buttonStyle={styles.buttonStyle}
        />
      )}
    </View>
  );
};

export default DataNotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  image: {
    height: '50%',
    width: '100%',
    resizeMode: 'contain',
  },
  buttonStyle: {
    paddingHorizontal: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
