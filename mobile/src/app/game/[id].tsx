import { fetchCountryAsync } from "@/api/countries";
import { fetchQuestionPack } from "@/api/questionPacks";
import GameContent from "@/components/gameContent";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { usePreventRemove } from "expo-router/react-navigation";
import { useState } from "react";
import { Alert, Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameScreen() {
  const { id: countryId } = useLocalSearchParams<{ id: string }>();
  const [gameFinished, setGameFinished] = useState(false);
  const router = useRouter();
  const { addCompletedCountry } = usePlayerProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const registerAnswer = (choice: number) => {
    setAnswers((current) => [...current, choice]);
    setCurrentQuestion(currentQuestion + 1);
  };

  const countryQuery = useQuery({
    queryKey: ["country", countryId],
    queryFn: () => fetchCountryAsync(countryId),
  });

  const {
    data: questionPack,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["questionpack"],
    queryFn: () => fetchQuestionPack(countryQuery.data.questionPackId),
    enabled: Boolean(countryQuery.data),
  });

  usePreventRemove(!gameFinished, () => {
    Alert.alert("Spelet pågår", "Slutför spelet innan du lämnar sidan.");
  });

  if (countryQuery.isError || isError)
    return (
      <SafeAreaView>
        <Text>Något gick fel. Kunde inte hämta spelinfo.</Text>
      </SafeAreaView>
    );

  if (countryQuery.isPending || isPending)
    return (
      <SafeAreaView>
        <Text>Laddar...</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: String(countryId) }} />
      <Text>Game screen: {countryId}</Text>
      {questionPack && (
        <GameContent
          questionPack={questionPack}
          currentQuestion={currentQuestion}
          registerChoice={registerAnswer}
        />
      )}
      <Button
        title="(debug) Auto-win"
        onPress={() => {
          setGameFinished(true);
          addCompletedCountry({
            id: countryId,
            regionId: countryQuery.data.regionId,
          });
          router.replace({
            pathname: "/result/[id]",
            params: { id: countryId },
          });
        }}
      />
    </SafeAreaView>
  );
}
