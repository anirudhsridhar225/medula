import { Stack } from "expo-router";
import { StyleSheet, TextInput } from "react-native";
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}