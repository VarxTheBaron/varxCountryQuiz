import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ResultScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: String(id) }} />
      <Text>Result screen: {id}</Text>
    </View>
  );
}
