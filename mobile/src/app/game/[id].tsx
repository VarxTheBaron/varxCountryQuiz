import { fetchCountryAsync } from "@/api/countries";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { usePreventRemove } from "expo-router/react-navigation";
import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

export default function GameScreen() {
  const { id } = useLocalSearchParams();
  const countryId = Array.isArray(id) ? id[0] : id;
  const [gameFinished, setGameFinished] = useState(false);
  const router = useRouter();
  const prog = usePlayerProgress();

  const query = useQuery({
    queryKey: ["country", countryId],
    queryFn: () => fetchCountryAsync(countryId),
    enabled: Boolean(countryId),
  });

  usePreventRemove(!gameFinished, () => {
    Alert.alert("Spelet pågår", "Slutför spelet innan du lämnar sidan.");
  });

  return (
    <View>
      <Stack.Screen options={{ title: String(countryId) }} />
      <Text>Game screen: {countryId}</Text>
      <Text>country (debug): {JSON.stringify(query.data)}</Text>
      <Button
        title="(debug) Auto-win"
        onPress={() => {
          setGameFinished(true);
          prog.addCompletedCountry({
            id: countryId,
            regionId: query.data.regionId,
          });
          router.replace({
            pathname: "/result/[id]",
            params: { id: countryId },
          });
        }}
      />
    </View>
  );
}
