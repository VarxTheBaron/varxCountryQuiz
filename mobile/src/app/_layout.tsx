import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Start" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="country/[id]" />
      <Stack.Screen name="region/[id]" />
      <Stack.Screen name="game/[countryid]" />
      <Stack.Screen name="result/[countryid]" />
    </Stack>
  );
}
