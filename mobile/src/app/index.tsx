import { fetchRegionsAsync } from "@/api/regions";
import RegionCard from "@/components/regionCard";
import { usePlayerProgress } from "@/data/usePlayerProgress";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { data } = usePlayerProgress();
  const query = useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegionsAsync,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text>Start screen</Text>
      <Text>{data.xp}</Text>
      <Text>{data.completedCountries}</Text>
      {query.isPending && <Text>Laddar regioner...</Text>}
      {query.isError && <Text>Kunde inte hämta regioner.</Text>}
      {query.data && (
        <FlatList
          data={query.data}
          horizontal
          renderItem={({ item }) => <RegionCard region={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
      <Pressable>
        <Link
          href={{
            pathname: "/country/[id]",
            params: { id: "123" },
          }}
        >
          country123
        </Link>
      </Pressable>
      <Pressable>
        <Link
          href={{
            pathname: "/region/[id]",
            params: { id: "123" },
          }}
        >
          region123
        </Link>
      </Pressable>
      <Pressable>
        <Link
          href={{
            pathname: "/game/[countryid]",
            params: { countryid: "123" },
          }}
        >
          game123
        </Link>
      </Pressable>
      <Pressable>
        <Link
          href={{
            pathname: "/result/[countryid]",
            params: { countryid: "123" },
          }}
        >
          result123
        </Link>
      </Pressable>
      <Pressable>
        <Link href="/profile">profile</Link>
      </Pressable>
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
