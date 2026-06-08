import React, { FC, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import { useTheme } from '../../hooks/ThemeContext';
import CustomText from '../CustomText';
import ColorCircle from '../ColorCircle';

type LabelValueProps = {
  label: string;
  value?: string | number;
  type?: 'text' | 'color';
  rightComponent?: ReactNode;
};

const LabelValue: FC<LabelValueProps> = ({
  label,
  value,
  type = 'text',
  rightComponent,
}) => {
  const { colors } = useTheme();

  if (!value && !rightComponent) return null;

  return (
    <View style={styles.item}>
      <CustomText
        fontFamily={Config.FONT_FAMILY_SEMI}
        color={colors.blue}
        text={label}
        fontSize={14}
      />

      {rightComponent ? (
        rightComponent
      ) : type === 'color' ? (
        <ColorCircle colorCode={String(value)} />
      ) : (
        <CustomText
          fontSize={14}
          fontFamily={Config.FONT_FAMILY_SEMI}
          text={String(value)}
          customStyle={{ flexShrink: 1, textAlign: 'justify', }}
        />
      )}
    </View>
  );
};

export default LabelValue;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20
  },
});
