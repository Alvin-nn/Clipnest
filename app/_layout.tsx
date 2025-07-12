import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { ThemeProvider } from '../theme/themecontext'; // Correct path

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Lobster: require('../assets/fonts/Lobster-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsAuthenticated(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="auth/get-started" />
        )}

        {/* Enable modal presentation for modals folder */}
        <Stack.Screen
          name="modals/PostCreationModal"
          options={{
            presentation: 'transparentModal', // or 'modal' for iOS-style slide-up
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
