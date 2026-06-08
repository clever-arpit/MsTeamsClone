import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { loginSuccess, setAuthError, setAuthLoading, setProfile } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const SignUpScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      dispatch(setAuthError('Fill all fields to create your account.'));
      return;
    }

    const now = new Date().toISOString();
    const user = {
      id: `user-${Date.now()}`,
      email: email.trim().toLowerCase(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      createdAt: now,
    };

    dispatch(setAuthLoading(true));
    dispatch(setProfile({
      ...user,
      headline: 'Open to building meaningful professional connections',
      about: 'New to LinkedInClone and ready to share updates, follow peers, and grow a network.',
      location: 'India',
      updatedAt: now,
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
    }));
    dispatch(loginSuccess({ user, token: 'demo-access-token', refreshToken: 'demo-refresh-token' }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.brand}>LinkedIn</Text>
        <Text style={styles.title}>Join your professional community</Text>

        <View style={styles.form}>
          <View style={styles.nameRow}>
            <TextInput
              onChangeText={setFirstName}
              placeholder="First name"
              placeholderTextColor={COLORS.TEXT_TERTIARY}
              style={[styles.input, styles.nameInput]}
              value={firstName}
            />
            <TextInput
              onChangeText={setLastName}
              placeholder="Last name"
              placeholderTextColor={COLORS.TEXT_TERTIARY}
              style={[styles.input, styles.nameInput]}
              value={lastName}
            />
          </View>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email"
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

          <Text style={styles.terms}>
            By joining, you agree to keep the demo kind, useful, and professional.
          </Text>

          <Pressable style={styles.primaryButton} onPress={handleSignUp} disabled={loading}>
            <Text style={styles.primaryButtonText}>{loading ? 'Creating account...' : 'Agree & Join'}</Text>
          </Pressable>

          <Pressable style={styles.linkButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Already on LinkedIn? Sign in</Text>
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
    fontSize: 32,
    fontWeight: '700',
    marginBottom: SPACING.XL,
  },
  title: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XL,
  },
  form: {
    gap: SPACING.M,
  },
  nameRow: {
    flexDirection: 'row',
    gap: SPACING.M,
  },
  nameInput: {
    flex: 1,
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
  terms: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
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
  linkButton: {
    alignItems: 'center',
    paddingVertical: SPACING.M,
  },
  linkText: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.PRIMARY,
  },
});

export default SignUpScreen;
