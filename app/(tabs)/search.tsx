import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Keyboard,
    Modal,
    Platform,
    Pressable,
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
  title?: string;
  description?: string;
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
  const [selectedPin, setSelectedPin] = useState<ImageItem | null>(null);

  // Add debounce timer ref
  const debounceTimer = useRef<any>(null);

  const fetchImages = useCallback(async (reset = false) => {
    console.log('fetchImages called', searchRef.current);
    const query = searchRef.current;
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const page = reset ? 1 : pageRef.current;
      // Unsplash fetch
      const unsplashPromise = fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${PER_PAGE}&client_id=${UNSPLASH_ACCESS_KEY}`
      ).then(async res => {
        if (!res.ok) {
          const txt = await res.text();
          console.error('Unsplash error response:', txt);
          throw new Error('Unsplash: ' + txt);
        }
        const json = await res.json();
        console.log('Unsplash API response:', json);
        return json;
      });
      // Pexels fetch
      const pexelsPromise = fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${PER_PAGE}`,
        { headers: { Authorization: PEXELS_API_KEY } }
      ).then(async res => {
        if (!res.ok) {
          const txt = await res.text();
          console.error('Pexels error response:', txt);
          throw new Error('Pexels: ' + txt);
        }
        const json = await res.json();
        console.log('Pexels API response:', json);
        return json;
      });
      // Wait for both
      const [unsplashData, pexelsData] = await Promise.all([unsplashPromise, pexelsPromise]);
      // Normalize
      const unsplashImages: ImageItem[] = (unsplashData.results || []).map((img: any) => ({ id: 'u_' + img.id, url: img.urls.small }));
      const pexelsImages: ImageItem[] = (pexelsData.photos || []).map((img: any) => ({ id: 'p_' + img.id, url: img.src.medium }));
      const merged = reset ? [...unsplashImages, ...pexelsImages] : [...images, ...unsplashImages, ...pexelsImages];
      setImages(merged);
      console.log('Images:', merged);
      pageRef.current = page + 1;
      setHasMore(unsplashImages.length + pexelsImages.length > 0);
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
      console.error('Image fetch error:', e);
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
    <TouchableOpacity onPress={() => setSelectedPin(item)} activeOpacity={0.85}>
      <Image
        source={{ uri: item.url }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const searchForSuggestion = (label: string) => {
    setSearchText(label);
    setShowSuggestions(false);
    searchRef.current = label;
    setImages([]);
    setHasMore(true);
    setError('');
    pageRef.current = 1;
    fetchImages(true);
    Keyboard.dismiss();
  };

  const renderSuggestionTile = ({ item }: { item: typeof SUGGESTIONS[0] }) => (
    <TouchableOpacity
      style={styles.suggestionTile}
      onPress={() => searchForSuggestion(item.label)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.suggestionImage} />
      <View style={styles.suggestionOverlay} />
      <Text style={styles.suggestionLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  // Debounced search effect
  useEffect(() => {
    if (searchText.trim() === '') {
      setShowSuggestions(true);
      setImages([]);
      setError('');
      setHasMore(true);
      return;
    }
    setShowSuggestions(false);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      console.log('Debounced search effect triggered for', searchText);
      searchRef.current = searchText;
      setImages([]);
      setHasMore(true);
      setError('');
      pageRef.current = 1;
      fetchImages(true);
    }, 600); // 600ms debounce
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

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
            {images.length === 0 && !loading ? (
              <Text style={{ color: isDarkMode ? '#fff' : '#181D1C', textAlign: 'center', marginTop: 32, fontSize: 16 }}>
                No results found
              </Text>
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
        {/* Pin Details Modal */}
        <Modal
          visible={!!selectedPin}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedPin(null)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setSelectedPin(null)}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedPin?.url }}
                style={styles.modalImage}
                resizeMode="contain"
              />
              {selectedPin?.title && (
                <Text style={styles.modalTitle}>{selectedPin.title}</Text>
              )}
              {selectedPin?.description && (
                <Text style={styles.modalDesc}>{selectedPin.description}</Text>
              )}
              <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPin(null)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
      </View>
          </Pressable>
        </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    maxWidth: '90%',
    maxHeight: '80%',
  },
  modalImage: {
    width: 260,
    height: 260,
    borderRadius: 14,
    marginBottom: 16,
    backgroundColor: '#ccc',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDesc: {
    color: '#ccc',
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#4EE0C1',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 8,
  },
  closeButtonText: {
    color: '#181D1C',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
