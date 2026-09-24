import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function CountryScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: String(id) }} />
      <Text>Country screen: {id}</Text>
    </View>
  );
}
