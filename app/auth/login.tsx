import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Navigate to tabs screen even if fields are empty (for now)
    router.replace('/(tabs)');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Log in</Text>

        <Pressable style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </Pressable>

        <Pressable style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </Pressable>

        <Pressable style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </Pressable>

        <Text style={styles.or}>OR</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          style={[
            styles.loginButton,
            (email || password) && { backgroundColor: '#26A69A' },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </Pressable>

        <Text style={styles.forgot}>Forgot password?</Text>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#212121',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
  },
  socialButton: {
    backgroundColor: '#26A69A',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  or: {
    color: '#aaa',
    marginVertical: 15,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#4A5A6A',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgot: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 5,
  },
});
