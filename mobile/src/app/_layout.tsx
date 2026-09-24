import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const qc = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={qc}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: "Country Challenge" }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
        <Stack.Screen name="country/[id]" />
        <Stack.Screen name="region/[id]" />
        <Stack.Screen name="game/[countryid]" />
        <Stack.Screen name="result/[countryid]" />
      </Stack>
      <StatusBar style="dark" />
    </QueryClientProvider>
  );
}
