import { fetchCountryAsync } from "@/api/countries";
import { fetchQuestionPack } from "@/api/questionPacks";
import GameContent from "@/components/gameContent";
import QuizExitDialog from "@/components/quizExitDialog";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { useQuery } from "@tanstack/react-query";
import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { usePreventRemove } from "expo-router/react-navigation";
import { useEffect, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type RoundResult =
  | { kind: "quiz"; correct: number; total: number; required: number }
  | { kind: "debug" };

export default function GameScreen() {
  const { id: countryId } = useLocalSearchParams<{ id: string }>();
  const [result, setResult] = useState<RoundResult | null>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const pendingExit = useRef<(() => void) | null>(null);
  const navigation = useNavigation();
  const router = useRouter();
  const { addCompletedCountry, addAttemptedCountry } = usePlayerProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const registerAnswer = (choice: number) => {
    if (selectedChoice !== null) return;
    setSelectedChoice(choice);
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
    queryKey: ["questionpack", countryQuery.data?.questionPackId],
    queryFn: () => fetchQuestionPack(countryQuery.data.questionPackId),
    enabled: Boolean(countryQuery.data),
  });

  const continueQuiz = () => {
    if (!questionPack || selectedChoice === null) return;

    const nextAnswers = [...answers, selectedChoice];
    if (currentQuestion < questionPack.questions.length - 1) {
      setAnswers(nextAnswers);
      setCurrentQuestion((current) => current + 1);
      setSelectedChoice(null);
      return;
    }

    const correctAnswers = questionPack.questions.reduce(
      (score, question, index) =>
        score + Number(question.correctAnswer === nextAnswers[index]),
      0,
    );
    const country = { id: countryId, regionId: countryQuery.data.regionId };
    addAttemptedCountry({ ...country, bestAttempt: correctAnswers });
    if (correctAnswers >= questionPack.requiredCorrectAnswers) {
      addCompletedCountry(country);
    }
    setResult({
      kind: "quiz",
      correct: correctAnswers,
      total: questionPack.questions.length,
      required: questionPack.requiredCorrectAnswers,
    });
  };

  usePreventRemove(result === null, ({ data }) => {
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

  useEffect(() => {
    if (!result) return;

    // Låt usePreventRemove släppa skärmen innan resultatvyn öppnas.
    const frame = requestAnimationFrame(() => {
      router.replace({
        pathname: "/result/[id]",
        params:
          result.kind === "debug"
            ? { id: countryId, mode: "debug" }
            : {
                id: countryId,
                mode: "quiz",
                correct: String(result.correct),
                total: String(result.total),
                required: String(result.required),
              },
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [countryId, result, router]);

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <QuizExitDialog
        visible={showExitDialog}
        onStay={stayInQuiz}
        onLeave={leaveQuiz}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.inner}>
          {countryQuery.isError || isError ? (
            <Text style={styles.statusText}>
              Något gick fel. Kunde inte hämta spelinfo.
            </Text>
          ) : countryQuery.isPending || isPending ? (
            <Text style={styles.statusText}>Laddar frågor...</Text>
          ) : (
            <>
              <Stack.Screen options={{ title: countryQuery.data.name }} />
              {questionPack && (
                <GameContent
                  questionPack={questionPack}
                  currentQuestion={currentQuestion}
                  selectedChoice={selectedChoice}
                  registerChoice={registerAnswer}
                  continueQuiz={continueQuiz}
                />
              )}
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  addCompletedCountry({
                    id: countryId,
                    regionId: countryQuery.data.regionId,
                  });
                  setResult({ kind: "debug" });
                }}
                style={styles.debugButton}
              >
                <Text style={styles.debugText}>Debug: klara landet direkt</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#C7D2FE" },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  inner: { width: "100%", maxWidth: 560, alignSelf: "center", gap: 22 },
  statusText: { color: "#1E1B4B", fontSize: 16, textAlign: "center" },
  debugButton: {
    alignSelf: "center",
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  debugText: {
    color: "#4338CA",
    fontSize: 13,
    textDecorationLine: "underline",
  },
});
