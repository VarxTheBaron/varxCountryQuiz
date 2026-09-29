import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { usePreventRemove } from "expo-router/build/react-navigation";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function ResultScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [goToStart, setGoToStart] = useState(false);

  usePreventRemove(!goToStart, () => {});

  return (
    <View>
      <Stack.Screen
        options={{
          title: String(id),
          headerBackVisible: false,
          gestureEnabled: false,
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Text>Result screen: {id}</Text>
      <Button
        title="Back to start"
        onPress={() => {
          setGoToStart(true);
          router.dismissTo("/");
        }}
      />
    </View>
  );
}
