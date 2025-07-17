import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useThemeContext } from '../../theme/themecontext';

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 48) / 2; // two images per row with padding

export default function HomeScreen() {
  const { isDarkMode } = useThemeContext();
  const [images, setImages] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const backgroundColor = isDarkMode ? '#181D1C' : '#F3FAF8';

  const fetchImages = () => {
    const newImages = Array.from({ length: 20 }, () => {
      const randomSeed = Math.floor(Math.random() * 1000);
      return `https://picsum.photos/seed/${randomSeed}/300/400`;
    });
    setImages(newImages);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchImages();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={{ backgroundColor }}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.grid}>
        {images.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: (Dimensions.get('window').width - 48) / 2, // screen width - paddings
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
});
