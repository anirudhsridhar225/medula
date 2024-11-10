import { Stack } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { initializeNotifications } from "@/components/NotificationService";

import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    initializeNotifications();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value = { colorScheme === "dark" ? DarkTheme : DefaultTheme }>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown : false }} />
      </Stack>
    </ThemeProvider>
  );
}
