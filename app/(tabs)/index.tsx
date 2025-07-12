import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useThemeContext } from '../../theme/themecontext'; // adjust path based on your structure

export default function HomeScreen() {
  const { isDarkMode } = useThemeContext();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000' : '#fff' },
      ]}
    >
      {[...Array(10)].map((_, i) => (
        <View
          key={i}
          style={[
            styles.plate,
            { backgroundColor: isDarkMode ? '#333' : '#eee' },
          ]}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  plate: {
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
});
