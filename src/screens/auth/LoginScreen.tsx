import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { demoAuthUser } from '../../data/demoData';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginSuccess, setAuthError, setAuthLoading } from '../../redux';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('arpit@msteamsclone.dev');
  const [password, setPassword] = useState('password');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      dispatch(setAuthError('Email and password are required.'));
      return;
    }

    dispatch(setAuthLoading(true));
    dispatch(
      loginSuccess({
        user: { ...demoAuthUser, email: email.trim().toLowerCase() },
        token: 'demo-access-token',
        refreshToken: 'demo-refresh-token',
      })
    );
  };

  const showDemoHint = () => {
    Alert.alert('Demo account', 'Use any email and password. The app stores the logged-in user in Redux.');
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.brand}>MS Teams</Text>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Stay connected and collaborate with your team.</Text>

        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email or phone"
            placeholderTextColor={COLORS.TEXT_TERTIARY}
            style={styles.input}
            value={email}
          />
          <TextInput
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={COLORS.TEXT_TERTIARY}
            secureTextEntry
            style={styles.input}
            value={password}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable onPress={showDemoHint}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </Pressable>

          <Pressable style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
            <Text style={styles.primaryButtonText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <Pressable style={styles.outlineButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.outlineButtonText}>New to Teams? Join now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.L,
  },
  brand: {
    color: COLORS.PRIMARY,
    fontSize: 34,
    fontWeight: '700',
    marginBottom: SPACING.XL,
  },
  title: {
    ...TYPOGRAPHY.H1,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.S,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY1,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XL,
  },
  form: {
    gap: SPACING.M,
  },
  input: {
    borderColor: COLORS.TEXT_SECONDARY,
    borderRadius: 4,
    borderWidth: 1,
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    minHeight: 54,
    paddingHorizontal: SPACING.M,
  },
  error: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.ERROR,
  },
  forgot: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.PRIMARY,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 28,
    minHeight: 54,
    justifyContent: 'center',
  },
  primaryButtonText: {
    ...TYPOGRAPHY.BUTTON,
    color: COLORS.TEXT_INVERSE,
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.M,
  },
  divider: {
    backgroundColor: COLORS.BORDER,
    flex: 1,
    height: 1,
  },
  dividerText: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
  },
  outlineButton: {
    alignItems: 'center',
    borderColor: COLORS.PRIMARY,
    borderRadius: 28,
    borderWidth: 1,
    minHeight: 54,
    justifyContent: 'center',
  },
  outlineButtonText: {
    ...TYPOGRAPHY.BUTTON,
    color: COLORS.PRIMARY,
  },
});

export default LoginScreen;
