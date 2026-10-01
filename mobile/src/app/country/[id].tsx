import { theme } from "@/theme";
import { fetchCountryAsync } from "@/api/countries";
import CountryContent from "@/components/countryContent";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CountryScreen() {
  const { progress, hasRead, loadingError } = usePlayerProgress();

  const { id: countryId } = useLocalSearchParams<{ id: string }>();

  const query = useQuery({
    queryKey: ["country", countryId],
    queryFn: () => fetchCountryAsync(countryId),
    enabled: Boolean(countryId),
  });

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <Stack.Screen options={{ title: query.data?.name ?? "Land" }} />
      <ScrollView contentContainerStyle={styles.content}>
        {!countryId && <Text>Inget land valt.</Text>}
        {countryId && query.isPending && <Text>Laddar landet...</Text>}
        {query.isError && <Text>Kunde inte ladda landet.</Text>}
        {query.data && (
          <CountryContent
            country={query.data}
            completed={progress.completedCountries.some(
              (c) => c.id === countryId,
            )}
            bestAttempt={
              progress.attemptedCountries.find((c) => c.id === countryId)
                ?.bestAttempt
            }
            progressLoaded={hasRead}
            progressError={loadingError}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen,
  },
  content: {
    width: "100%",
    maxWidth: 560,
    flexGrow: 1,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xxl,
  },
});
