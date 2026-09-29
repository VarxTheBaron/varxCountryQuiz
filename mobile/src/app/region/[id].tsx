import {
  fetchCountriesByRegionAsync,
  fetchSingleRegionAsync,
} from "@/api/regions";
import CountryCard from "@/components/countryCard";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegionScreen() {
  const { progress } = usePlayerProgress();

  const { id } = useLocalSearchParams();
  const regionId = Array.isArray(id) ? id[0] : id;

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

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: query.data ? "Region: " + String(query.data.name) : "Region: ",
        }}
      />
      <Text>Region screen: {regionId}</Text>

      {query.isPending && <Text>Laddar...</Text>}
      {query.isError && (
        <Text>Det gick inte att hämta information om regionen.</Text>
      )}
      {countryQuery.isPending && <Text>Laddar länder...</Text>}
      {countryQuery.isError && <Text>Kunde inte ladda länder.</Text>}
      {countryQuery.data &&
        countryQuery.data.map((country) => (
          <CountryCard key={country.id} country={country} />
        ))}
    </SafeAreaView>
  );
}
