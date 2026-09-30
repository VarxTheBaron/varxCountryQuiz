import { fetchCountryAsync } from "@/api/countries";
import { fetchQuestionPack } from "@/api/questionPacks";
import GameContent from "@/components/gameContent";
import QuizExitDialog from "@/components/quizExitDialog";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { usePreventRemove } from "expo-router/react-navigation";
import { useRef, useState } from "react";
import { Button, Platform, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameScreen() {
  const { id: countryId } = useLocalSearchParams<{ id: string }>();
  const [gameFinished, setGameFinished] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const pendingExit = useRef<(() => void) | null>(null);
  const navigation = useNavigation();
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

  usePreventRemove(!gameFinished, ({ data }) => {
    if (Platform.OS === "web") {
      if (
        window.confirm(
          "Avsluta quizet? Dina svar i det pågående quizet försvinner.",
        )
      ) {
        navigation.dispatch(data.action);
      }
      return;
    }

    pendingExit.current = () => navigation.dispatch(data.action);
    setShowExitDialog(true);
  });

  const stayInQuiz = () => {
    pendingExit.current = null;
    setShowExitDialog(false);
  };

  const leaveQuiz = () => {
    const exit = pendingExit.current;
    pendingExit.current = null;
    setShowExitDialog(false);
    exit?.();
  };

  return (
    <SafeAreaView>
      <QuizExitDialog
        visible={showExitDialog}
        onStay={stayInQuiz}
        onLeave={leaveQuiz}
      />

      {countryQuery.isError || isError ? (
        <Text>Något gick fel. Kunde inte hämta spelinfo.</Text>
      ) : countryQuery.isPending || isPending ? (
        <Text>Laddar...</Text>
      ) : (
        <>
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
        </>
      )}
    </SafeAreaView>
  );
}
