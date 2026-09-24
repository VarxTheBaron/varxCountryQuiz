import { usePlayerProgress } from "@/data/usePlayerProgress";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { data } = usePlayerProgress();

  return (
    <SafeAreaView>
      <View>
        <Text>Start screen</Text>
        <Text>{data.xp}</Text>
        <Text>{data.completedCountries}</Text>
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
      </View>
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
