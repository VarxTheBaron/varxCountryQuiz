import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { type Country } from "../../../api/src/data/countries";

interface Props {
  country: Country;
}

export default function CountryCard({ country }: Props) {
  return (
    <Link
      href={{ pathname: "/country/[id]", params: { id: country.id } }}
      asChild
    >
      <Pressable>
        <View style={styles.card}>
          <Text style={styles.title}>
            {country.flag} {country.name + " "}
          </Text>
          <Text style={styles.title}>Difficulty {country.difficulty}</Text>
          <MaterialIcons name="arrow-right" size={24} color="black" />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
  },
  title: { fontSize: 18, fontWeight: "500" },
});
