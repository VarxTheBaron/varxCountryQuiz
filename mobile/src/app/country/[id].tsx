import { fetchCountryAsync } from "@/api/countries";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CountryScreen() {
  const { progress } = usePlayerProgress();

  const { id } = useLocalSearchParams();
  const countryId = Array.isArray(id) ? id[0] : id;

  const query = useQuery({
    queryKey: ["country", countryId],
    queryFn: () => fetchCountryAsync(countryId),
    enabled: Boolean(countryId),
  });

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: String(countryId) }} />
      <Text>Country screen: {countryId}</Text>
      {query.isPending && <Text>Laddar...</Text>}
      {query.isError && <Text>Kunde inte ladda landet.</Text>}
      {query.data && <Text>Country name: {query.data.name}</Text>}
    </SafeAreaView>
  );
}
