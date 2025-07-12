import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useThemeContext } from '../theme/themecontext';

export default function DisplayScreen() {
  const router = useRouter();
  const { theme, setTheme, isDarkMode } = useThemeContext();

  const renderOption = (label: string, value: 'light' | 'dark' | 'system') => {
    const isSelected = theme === value;

    return (
      <TouchableOpacity
        onPress={() => setTheme(value)}
        style={styles.optionRow}
      >
        <Text style={[styles.optionLabel, { color: isDarkMode ? '#fff' : '#000' }]}>
          {label}
        </Text>
        {isSelected && (
          <Ionicons name="checkmark" size={20} color={isDarkMode ? '#fff' : '#000'} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={28} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
            Display
          </Text>
          <View style={{ width: 28 }} /> {/* spacer */}
        </View>

        {/* Theme Options */}
        <View style={styles.optionsContainer}>
          {renderOption('Light Mode', 'light')}
          {renderOption('Dark Mode', 'dark')}
          {renderOption('Use device theme', 'system')}
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
  optionsContainer: {
    padding: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionLabel: {
    fontSize: 16,
  },
});
