import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { useThemeContext } from '../../theme/themecontext';

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 48) / 2; // two images per row with padding

function generateImages(count = 20) {
  return Array.from({ length: count }, () => {
    const randomSeed = Math.floor(Math.random() * 1000000);
    return `https://picsum.photos/seed/${randomSeed}/300/400`;
  });
}

export default function HomeScreen() {
  const { isDarkMode } = useThemeContext();
  const [images, setImages] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const backgroundColor = isDarkMode ? '#181D1C' : '#F3FAF8';

  const fetchInitialImages = useCallback(() => {
    setImages(generateImages());
  }, []);

  const fetchMoreImages = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setImages(prev => [...prev, ...generateImages()]);
      setLoadingMore(false);
    }, 500);
  }, [loadingMore]);

  useEffect(() => {
    fetchInitialImages();
  }, [fetchInitialImages]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchInitialImages();
      setRefreshing(false);
    }, 500);
  }, [fetchInitialImages]);

  const renderItem = ({ item }: { item: string }) => (
    <Image
      source={{ uri: item }}
      style={styles.image}
      resizeMode="cover"
    />
  );

  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => item + index}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.container}
      style={{ backgroundColor }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={fetchMoreImages}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loadingMore ? <View style={{ height: 40 }} /> : null}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: (Dimensions.get('window').width - 48) / 2, // screen width - paddings
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    marginRight: 16,
  },
});
