import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { useThemeContext } from '../theme/themecontext';

export default function SettingsScreen() {
  const router = useRouter();
  const { isDarkMode } = useThemeContext();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={28} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Settings</Text>
          <View style={{ width: 28 }} /> {/* Placeholder to center the title */}
        </View>

        {/* Settings options */}
        <View style={styles.content}>
          <Text style={[styles.option, { color: isDarkMode ? '#fff' : '#000' }]}>Account Settings</Text>
          <Text style={[styles.option, { color: isDarkMode ? '#fff' : '#000' }]}>Notifications</Text>
          <Text style={[styles.option, { color: isDarkMode ? '#fff' : '#000' }]}>Privacy</Text>

          {/* ✅ New Display option */}
          <TouchableOpacity onPress={() => router.push('/display')}>
            <Text style={[styles.option, { color: isDarkMode ? '#fff' : '#000' }]}>Display</Text>
          </TouchableOpacity>

          <Text style={[styles.option, { color: isDarkMode ? '#fff' : '#000' }]}>Help & Support</Text>
          <Text style={[styles.option, { color: isDarkMode ? '#fff' : '#000' }]}>Logout</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  option: {
    fontSize: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
