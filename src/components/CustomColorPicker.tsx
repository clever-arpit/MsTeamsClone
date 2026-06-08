import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import ColorPicker, {
  Panel1,
  Preview,
  Swatches,
  HueSlider,
  OpacitySlider,
} from 'reanimated-color-picker';
import CustomModal from './CustomModal';
import { runOnJS } from 'react-native-worklets';

interface CustomColorPickerProps {
  value: string;
  visible: boolean;
  onClose: () => void;
  onChange: (value: string) => void;
}

const CustomColorPicker: FC<CustomColorPickerProps> = ({
  onClose,
  onChange,
  value = 'red',
  visible = false,
}) => {
  const onSelectColor = ({ hex }: { hex: string }) => {
    'worklet';
    runOnJS(onChange)(hex);
  };
  return (
    <CustomModal
      title={'Choose Color'}
      visible={visible}
      onClose={onClose}
      overlayClose={false}
      offsetTop={1}
    >
      <View style={styles.container}>
        <ColorPicker
          style={{ width: '100%', gap: 10 }}
          value={value}
          onComplete={onSelectColor}
        >
          <Preview style={{ height: 30 }} />
          <Panel1 />
          <HueSlider />
          <OpacitySlider />
        </ColorPicker>
      </View>
    </CustomModal>
  );
};

export default CustomColorPicker;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
  },
});
