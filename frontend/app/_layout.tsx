import { initializeNotifications } from "@/components/NotificationService";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    initializeNotifications();
  }, []);

  return (
    <PaperProvider theme={colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme}>
      <ThemeProvider value = { colorScheme === "dark" ? DarkTheme : DefaultTheme }>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown : false }} />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
