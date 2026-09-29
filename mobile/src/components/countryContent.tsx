import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { type Country } from "../../../api/src/data/countries";

interface Props {
  country: Country;
}

export default function CountryContent({ country }: Props) {
  return (
    <View>
      <Text>{country.name}</Text>
      <Link
        href={{ pathname: "/game/[id]", params: { id: country.id } }}
        asChild
      >
        <Pressable>
          <Text>Spela</Text>
        </Pressable>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({});
