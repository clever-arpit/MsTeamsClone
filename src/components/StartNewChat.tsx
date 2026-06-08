import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { useTheme } from '../hooks/ThemeContext';

const StartNewChat = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <CustomText text='Start new chat' color={colors.blue} />
    </View>
  );
};

export default StartNewChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
