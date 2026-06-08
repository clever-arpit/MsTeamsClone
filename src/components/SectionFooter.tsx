import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from './CustomText';
import { ThemeColors } from '../utils/theme';

type SectionFooterProps = {
  title: string;
  colors: ThemeColors;
};

const SectionFooter: React.FC<SectionFooterProps> = ({ title, colors }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.line, { backgroundColor: colors.border_color }]} />
      <View style={styles.textContainer}>
        <CustomText text={title} />
      </View>
      <View style={[styles.line, { backgroundColor: colors.border_color }]} />
    </View>
  );
};

export default SectionFooter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginVertical: 20,
  },
  line: {
    width: '30%',
    height: 1,
    marginHorizontal: 10,
  },
  textContainer: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 50,
  },
});
