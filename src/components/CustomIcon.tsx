import React from 'react';
import { Image } from 'react-native';

const CustomIcon: React.FC<{
  icon: any;
  color: string;
  size?: number;
  customStyle?: any;
}> = ({ icon, color, size = 22, customStyle }) => {
  return (
    icon && (
      <Image
        source={icon}
        style={[
          {
            width: size,
            height: size,
            tintColor: color,
          },
          customStyle,
        ]}
        resizeMode="contain"
      />
    )
  );
};

export default CustomIcon;
