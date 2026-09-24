import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
