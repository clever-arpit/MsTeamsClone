import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../styles';
import CustomText from '../CustomText';
import CustomIcon from '../CustomIcon';

interface BottomTabIconProps {
  color: string;
  focused: boolean;
  icon: string;
}

const BottomTabIcon: React.FC<BottomTabIconProps> = ({
  color,
  focused,
  icon,
}) => null;

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // height: 40,
    // justifyContent: 'center',
    // width: 44,
  },
});

export default BottomTabIcon;
