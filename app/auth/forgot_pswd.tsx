import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  // Basic email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendEmail = () => {
    // TODO: Implement actual email sending functionality
    // This would typically involve calling your backend API
    // For now, we'll just simulate the email being sent
    setEmailSent(true);
  };

  const handleBackToLogin = () => {
    router.replace('/auth/login');
  };

  if (emailSent) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Email Sent!</Text>
          <Text style={styles.emailText}>
            Password reset instructions have been sent to:
          </Text>
          <Text style={styles.emailAddress}>{email}</Text>
          <Pressable
            style={[
              styles.backButton,
              { backgroundColor: '#7BD4C8' }
            ]}
            onPress={handleBackToLogin}
          >
            <Text style={[styles.buttonText, { color: '#000000' }]}>Back to Login</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Reset your password</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#AAAAAA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Pressable
            style={[
              styles.button,
              { backgroundColor: isValidEmail(email) ? '#7BD4C8' : '#7BD4C880' }
            ]}
            onPress={handleSendEmail}
            disabled={!isValidEmail(email)}
          >
            <Text style={[
              styles.buttonText,
              { color: isValidEmail(email) ? '#000000' : '#00000080' }
            ]}>
              Send a password reset email
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D1C',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 120,
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    width: 344,
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  button: {
    width: 334,
    height: 43,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    width: 200,
    height: 43,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  emailText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  emailAddress: {
    color: '#7BD4C8',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
});
