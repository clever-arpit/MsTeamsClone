import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles';

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MsTeamsClone</Text>
      <Text style={styles.subtitle}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.TEXT_INVERSE,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.TEXT_INVERSE,
    opacity: 0.8,
  },
});

export default SplashScreen;
