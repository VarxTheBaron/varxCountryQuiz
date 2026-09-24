import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ResultScreen() {
  const { countryid } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: String(countryid) }} />
      <Text>Result screen: {countryid}</Text>
    </View>
  );
}
