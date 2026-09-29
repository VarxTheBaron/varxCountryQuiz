import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function GameScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: String(id) }} />
      <Text>Game screen: {id}</Text>
    </View>
  );
}
