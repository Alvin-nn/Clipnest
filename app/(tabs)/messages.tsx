import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const dummyMessages = new Array(10).fill(null); // 10 blank message placeholders

export default function Messages() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inbox</Text>
      <Text style={styles.subText}>Find people to message</Text>

      <FlatList
        data={dummyMessages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={() => (
          <View style={styles.messageBubble} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
    color: '#666',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  messageBubble: {
    height: 60,
    backgroundColor: '#e1e1e1',
    borderRadius: 15,
    marginBottom: 12,
  },
});
