import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function RegionScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: String(id) }} />
      <Text>Region screen: {id}</Text>
    </View>
  );
}
