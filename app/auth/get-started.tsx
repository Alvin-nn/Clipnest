import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useThemeContext } from '../../theme/themecontext';

export default function GetStartedScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    // Fade in and out animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace('/auth');
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#181D1C' : '#F3FAF8' }]}>
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>Clipnest</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 36,
    fontFamily: 'Lobster',
    letterSpacing: 2,
  },
});
