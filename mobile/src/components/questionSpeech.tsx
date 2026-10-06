import { theme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Question } from "../../../api/src/data/questions";

interface Props {
  question: Question;
}

export default function QuestionSpeech({ question }: Props) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState(false);
  const speechRun = useRef(0);

  const text = [
    question.question,
    ...question.answers.map(
      (answer, index) => `Svar ${String.fromCharCode(65 + index)}: ${answer}.`,
    ),
  ].join(" ");

  const stopReading = () => {
    speechRun.current += 1;
    setIsSpeaking(false);
    Speech.stop().catch(() => undefined);
  };

  const startReading = async () => {
    const run = ++speechRun.current;
    setSpeechError(false);
    setIsSpeaking(true);

    const finishReading = () => {
      if (speechRun.current === run) setIsSpeaking(false);
    };

    const handleError = () => {
      if (speechRun.current !== run) return;
      setIsSpeaking(false);
      setSpeechError(true);
    };

    try {
      await Speech.stop();
      if (speechRun.current !== run) return;

      Speech.speak(text, {
        language: "sv-SE",
        onDone: finishReading,
        onStopped: finishReading,
        onError: handleError,
      });
    } catch {
      handleError();
    }
  };

  useEffect(() => {
    return () => {
      speechRun.current += 1;
      Speech.stop().catch(() => undefined);
    };
  }, []);

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        onPress={isSpeaking ? stopReading : startReading}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <MaterialIcons
          name={isSpeaking ? "stop" : "volume-up"}
          size={20}
          color={theme.colors.primary}
        />
        <Text style={styles.buttonText}>
          {isSpeaking ? "Stoppa uppläsning" : "Läs upp fråga och svar"}
        </Text>
      </Pressable>
      {speechError && (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          Uppläsningen kunde inte starta på den här enheten.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginTop: 14,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.primarySurface,
  },
  pressed: { backgroundColor: theme.colors.primarySurfaceStrong },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontFamily: theme.fonts.bold,
  },
  error: {
    color: theme.colors.warning,
    fontSize: 13,
    fontFamily: theme.fonts.regular,
    marginTop: theme.spacing.sm,
  },
});
