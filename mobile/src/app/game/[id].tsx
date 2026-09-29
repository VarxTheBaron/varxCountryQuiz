import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { usePreventRemove } from "expo-router/build/react-navigation";
import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

export default function GameScreen() {
  const { id } = useLocalSearchParams();
  const countryId = Array.isArray(id) ? id[0] : id;
  const [gameFinished, setGameFinished] = useState(false);
  const router = useRouter();

  usePreventRemove(!gameFinished, () => {
    Alert.alert("Spelet pågår", "Slutför spelet innan du lämnar sidan.");
  });

  return (
    <View>
      <Stack.Screen options={{ title: String(countryId) }} />
      <Text>Game screen: {countryId}</Text>
      <Button
        title="(debug) Auto-win"
        onPress={() => {
          setGameFinished(true);
          router.dismissTo({
            pathname: "/result/[id]",
            params: { id: countryId },
          });
        }}
      />
    </View>
  );
}
