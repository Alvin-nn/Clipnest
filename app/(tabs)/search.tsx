import React, { useCallback, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Keyboard,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useThemeContext } from '../../theme/themecontext';

const UNSPLASH_ACCESS_KEY = 'BFOYbWJ2jnhmYi-W7Ew3uBsoQ7V-F_qals3ICv4SNIs';
const PEXELS_API_KEY = 'hVq7HPVbO1wmVUqvsA47uaHqeZdESbtdG2lovKcBkzTuopoaErCa226H';
const PER_PAGE = 20;

const SUGGESTIONS = [
  { label: 'Best nba players', image: 'https://images.pexels.com/photos/1103834/pexels-photo-1103834.jpeg' },
  { label: 'Hair routine men', image: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg' },
  { label: 'Home studio setup', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg' },
  { label: 'J cole art', image: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg' },
  { label: 'Mens outfits', image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg' },
  { label: 'Solo leveling', image: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg' },
  { label: 'Natural hair styles', image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' },
  { label: 'Cartoon profile pics', image: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg' },
  { label: 'Aesthetic guys', image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' },
  { label: 'Streetwear fashion', image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg' },
  { label: 'Summer hairstyles', image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' },
  { label: 'Mini drawings', image: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg' },
];

type ImageItem = {
  id: string;
  url: string;
};

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const { isDarkMode } = useThemeContext();
  const pageRef = useRef(1);
  const searchRef = useRef('');

  const fetchImages = useCallback(async (reset = false) => {
    const query = searchRef.current;
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const page = reset ? 1 : pageRef.current;
      // Unsplash fetch
      const unsplashPromise = fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${PER_PAGE}&client_id=${UNSPLASH_ACCESS_KEY}`
      ).then(res => res.ok ? res.json() : { results: [] });
      // Pexels fetch
      const pexelsPromise = fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${PER_PAGE}`,
        { headers: { Authorization: PEXELS_API_KEY } }
      ).then(res => res.ok ? res.json() : { photos: [] });
      // Wait for both
      const [unsplashData, pexelsData] = await Promise.all([unsplashPromise, pexelsPromise]);
      // Normalize
      const unsplashImages: ImageItem[] = (unsplashData.results || []).map((img: any) => ({ id: 'u_' + img.id, url: img.urls.small }));
      const pexelsImages: ImageItem[] = (pexelsData.photos || []).map((img: any) => ({ id: 'p_' + img.id, url: img.src.medium }));
      const merged = reset ? [...unsplashImages, ...pexelsImages] : [...images, ...unsplashImages, ...pexelsImages];
      setImages(merged);
      pageRef.current = page + 1;
      setHasMore(unsplashImages.length + pexelsImages.length > 0);
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [images]);

  const onSearch = () => {
    Keyboard.dismiss();
    setImages([]);
    setHasMore(true);
    setError('');
    pageRef.current = 1;
    searchRef.current = searchText;
    setShowSuggestions(false);
    fetchImages(true);
  };

  const loadMore = () => {
    if (!loading && hasMore && images.length > 0) {
      fetchImages();
    }
  };

  const renderItem = ({ item }: { item: ImageItem }) => (
    <Image
      source={{ uri: item.url }}
      style={styles.image}
      resizeMode="cover"
    />
  );

  const renderSuggestionTile = ({ item }: { item: typeof SUGGESTIONS[0] }) => (
    <TouchableOpacity
      style={styles.suggestionTile}
      onPress={() => {
        setSearchText(item.label);
        setShowSuggestions(false);
        searchRef.current = item.label;
        onSearch();
      }}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.suggestionImage} />
      <View style={styles.suggestionOverlay} />
      <Text style={styles.suggestionLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#181D1C' : '#F3FAF8' }}>
        <View style={{ paddingHorizontal: 12, paddingTop: Platform.OS === 'android' ? 24 : 0, backgroundColor: isDarkMode ? '#181D1C' : '#F3FAF8' }}>
          <View style={styles.searchBarRow}>
            <TextInput
              placeholder="Search Clipnest"
              placeholderTextColor={isDarkMode ? '#aaa' : '#999'}
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#222' : '#f0f0f0',
                  color: isDarkMode ? '#fff' : '#000',
                },
              ]}
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                setShowSuggestions(true);
              }}
              onFocus={() => {
                setSearchFocused(true);
                setShowSuggestions(true);
              }}
              onBlur={() => setSearchFocused(false)}
              onSubmitEditing={onSearch}
              returnKeyType="search"
            />
            {(searchFocused || searchText.length > 0) && (
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  setSearchText('');
                  setShowSuggestions(true);
                }}
                style={styles.cancelButton}
              >
                <Text style={[styles.cancelText, { color: isDarkMode ? '#fff' : '#181D1C' }]}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {showSuggestions && searchText.trim() === '' ? (
          <>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#181D1C', marginLeft: 16, marginTop: 16 }]}>Ideas for you</Text>
            <FlatList
              data={SUGGESTIONS}
              keyExtractor={(item) => item.label}
              renderItem={renderSuggestionTile}
              numColumns={2}
              contentContainerStyle={styles.suggestionGrid}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <>
            {error ? (
              <Text style={{ color: 'red', textAlign: 'center', marginTop: 16 }}>{error}</Text>
            ) : null}
            <FlatList
              data={images}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              numColumns={2}
              contentContainerStyle={styles.grid}
              style={{ flex: 1 }}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={loading ? <ActivityIndicator style={{ margin: 16 }} /> : null}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 17,
  },
  cancelButton: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  suggestionGrid: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  suggestionTile: {
    flex: 1,
    aspectRatio: 1.3,
    borderRadius: 18,
    margin: 8,
    overflow: 'hidden',
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 18,
  },
  suggestionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 18,
  },
  suggestionLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    zIndex: 2,
    paddingHorizontal: 8,
  },
  grid: {
    padding: 8,
  },
  image: {
    flex: 1,
    height: 220,
    borderRadius: 14,
    margin: 8,
    backgroundColor: '#ccc',
  },
});
