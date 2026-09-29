import { StyleSheet, Text, View } from "react-native";
import { type Country } from "../../../api/src/data/countries";

interface Props {
  country: Country;
}

export default function CountryCard({ country }: Props) {
  return (
    <View>
      <Text>{country.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
