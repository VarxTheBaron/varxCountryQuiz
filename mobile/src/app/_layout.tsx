import { SourceSans3_400Regular } from "@expo-google-fonts/source-sans-3/400Regular";
import { SourceSans3_600SemiBold } from "@expo-google-fonts/source-sans-3/600SemiBold";
import { SourceSans3_700Bold } from "@expo-google-fonts/source-sans-3/700Bold";
import { SourceSans3_800ExtraBold } from "@expo-google-fonts/source-sans-3/800ExtraBold";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

const qc = new QueryClient();
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SourceSans3_400Regular,
    SourceSans3_600SemiBold,
    SourceSans3_700Bold,
    SourceSans3_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) void SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

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
