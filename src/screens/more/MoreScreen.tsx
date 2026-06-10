import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const MoreScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>More</Text>
    <Text style={styles.subtitle}>Settings, help, and extras.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.BACKGROUND },
  title: { ...TYPOGRAPHY.H2, color: COLORS.TEXT_PRIMARY },
  subtitle: { ...TYPOGRAPHY.BODY2, color: COLORS.TEXT_SECONDARY, marginTop: SPACING.S },
});

export default MoreScreen;
