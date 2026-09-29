import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const qc = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={qc}>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="(tabs)"
          options={{ title: "Country Challenge", headerShown: false }}
        />
        <Stack.Screen name="country/[id]" />
        <Stack.Screen name="region/[id]" />
        <Stack.Screen name="game/[id]" />
        <Stack.Screen name="result/[id]" />
      </Stack>
      <StatusBar style="dark" />
    </QueryClientProvider>
  );
}
