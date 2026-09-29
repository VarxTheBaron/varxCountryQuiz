import { fetchRegionsAsync } from "@/api/regions";
import RegionCarousel from "@/components/regionCarousel";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { progress } = usePlayerProgress();
  const query = useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegionsAsync,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text>Country Challenge!</Text>
      <Text>{progress.xp}</Text>
      <Text>{progress.completedCountries}</Text>
      {query.isPending && <Text>Laddar regioner...</Text>}
      {query.isError && <Text>Kunde inte hämta regioner.</Text>}
      {query.data && (
        <RegionCarousel regions={query.data} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
