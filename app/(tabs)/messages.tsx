import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useThemeContext } from '../../theme/themecontext';

const dummyMessages = new Array(10).fill(null); // 10 blank message placeholders

export default function Messages() {
  const { isDarkMode } = useThemeContext();
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#181D1C' : '#F3FAF8' }]}>
      <Text style={[styles.header, { color: isDarkMode ? '#fff' : '#181D1C' }]}>Inbox</Text>
      <Text style={[styles.subText, { color: isDarkMode ? '#aaa' : '#666' }]}>Find people to message</Text>

      <FlatList
        data={dummyMessages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={() => (
          <View style={[styles.messageBubble, { backgroundColor: isDarkMode ? '#252A29' : '#E2F1ED' }]} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // so it's not too high on phones
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subText: {
    fontSize: 16,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  messageBubble: {
    height: 60,
    borderRadius: 15,
    marginBottom: 12,
  },
});
