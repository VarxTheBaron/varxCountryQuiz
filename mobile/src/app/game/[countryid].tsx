import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function GameScreen() {
  const { countryid } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: String(countryid) }} />
      <Text>Game screen: {countryid}</Text>
    </View>
  );
}
