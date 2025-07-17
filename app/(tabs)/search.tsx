import { useState } from 'react';
import {
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useThemeContext } from '../../theme/themecontext';

const fakeSuggestions = [
  'Basketball',
  'Sneakers',
  'Fitness workouts',
  'Food',
  'Tech gadgets',
  'Travel spots',
  'Jermaine Cole',
  'Hairstyles',
];

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const { isDarkMode } = useThemeContext();

  const filteredSuggestions = fakeSuggestions.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? '#181D1C' : '#F3FAF8' },
        ]}
      >
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={isDarkMode ? '#aaa' : '#999'}
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#222' : '#f0f0f0',
                color: isDarkMode ? '#fff' : '#000',
              },
            ]}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Text
                style={[
                  styles.cancelText,
                  { color: isDarkMode ? '#0af' : '#007AFF' },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {searchText.length > 0 && (
          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.suggestionItem,
                  { borderBottomColor: isDarkMode ? '#333' : '#eee' },
                ]}
                onPress={() => {
                  setSearchText(item);
                  Keyboard.dismiss();
                }}
              >
                <Text
                  style={[
                    styles.suggestionText,
                    { color: isDarkMode ? '#fff' : '#000' },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  cancelText: {
    marginLeft: 10,
    fontSize: 16,
  },
  suggestionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 16,
  },
});
