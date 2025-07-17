import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../theme/themecontext'; // Correct path

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAuthenticated] = useState(true); // Always authenticated

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Lobster: require('../assets/fonts/Lobster-Regular.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              presentation: 'transparentModal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
