import { fetchCountriesByRegion, fetchSingleRegionAsync } from "@/api/regions";
import CountryCard from "@/components/countryCard";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegionScreen() {
  const { progress } = usePlayerProgress();

  const { id } = useLocalSearchParams();
  const regionId = Array.isArray(id) ? id[0] : id;

  const query = useQuery({
    queryKey: ["region", id],
    queryFn: () => fetchSingleRegionAsync(regionId),
    enabled: Boolean(regionId),
  });

  const countryQuery = useQuery({
    queryKey: ["region", "countries", id],
    queryFn: () => fetchCountriesByRegion(regionId),
    enabled: Boolean(regionId),
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
      {query.data && (
        <View>
          <Text>{JSON.stringify(query.data)}</Text>
          {query.data.countries.map((countryId) => (
            <CountryCard key={countryId} />
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}
