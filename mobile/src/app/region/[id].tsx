import {
  fetchCountriesByRegionAsync,
  fetchSingleRegionAsync,
} from "@/api/regions";
import CountryCard from "@/components/countryCard";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { theme } from "@/theme";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegionScreen() {
  const { progress } = usePlayerProgress();

  const { id: regionId } = useLocalSearchParams<{ id: string }>();

  const query = useQuery({
    queryKey: ["region", regionId],
    queryFn: () => fetchSingleRegionAsync(regionId),
    enabled: Boolean(regionId),
  });

  const countryQuery = useQuery({
    queryKey: ["region", "countries", regionId],
    queryFn: () => fetchCountriesByRegionAsync(regionId),
    enabled: Boolean(regionId) && Boolean(query.data),
  });

  const completedCount = countryQuery.data?.filter((country) =>
    progress.completedCountries.some((c) => c.id === country.id),
  ).length;

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <Stack.Screen
        options={{
          title: query.data?.name ?? "Region",
        }}
      />
      <ScrollView contentContainerStyle={styles.content}>
        {query.data && (
          <View style={styles.heading}>
            <Text style={styles.eyebrow}>VÄLJ LAND</Text>
            <Text style={styles.title}>{query.data.name}</Text>
            <Text style={styles.subtitle}>
              {completedCount === undefined
                ? "Välj ett land för att fortsätta."
                : `${completedCount} av ${countryQuery.data?.length} länder avklarade`}
            </Text>
          </View>
        )}

        {!regionId && <Text>Ingen region vald.</Text>}
        {regionId && query.isPending && <Text>Laddar region...</Text>}
        {query.isError && (
          <Text>Det gick inte att hämta information om regionen.</Text>
        )}
        {query.isSuccess && countryQuery.isPending && (
          <Text>Laddar länder...</Text>
        )}
        {countryQuery.isError && <Text>Kunde inte ladda länder.</Text>}
        {countryQuery.data?.length === 0 && <Text>Inga länder att visa.</Text>}
        <View style={styles.list}>
          {countryQuery.data?.map((country) => (
            <CountryCard
              key={country.id}
              country={country}
              completed={progress.completedCountries.some(
                (c) => c.id === country.id,
              )}
            />
          ))}
        </View>
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
    maxWidth: 600,
    alignSelf: "center",
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  heading: {
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.xs,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: theme.fontWeights.bold,
    letterSpacing: 1.5,
  },
  title: {
    color: theme.colors.heading,
    fontSize: 30,
    fontWeight: theme.fontWeights.bold,
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 15,
  },
  list: {
    gap: 10,
  },
});
