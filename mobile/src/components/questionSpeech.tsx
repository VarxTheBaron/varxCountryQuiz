import { theme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Speech from "expo-speech";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Question } from "../../../api/src/data/questions";

export type QuestionSpeechHandle = { stop: () => void };

const QuestionSpeech = forwardRef<QuestionSpeechHandle, { question: Question }>(
  function QuestionSpeech({ question }, ref) {
    const speechRun = useRef(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechError, setSpeechError] = useState(false);

    const stopReading = () => {
      speechRun.current += 1;
      setIsSpeaking(false);
      void Speech.stop().catch(() => undefined);
    };

    useImperativeHandle(ref, () => ({ stop: stopReading }));

    const startReading = async () => {
      const run = ++speechRun.current;
      setSpeechError(false);
      setIsSpeaking(true);

      try {
        await Speech.stop();
        if (speechRun.current !== run) return;

        const text = [
          question.question,
          ...question.answers.map(
            (answer, index) =>
              `Svar ${String.fromCharCode(65 + index)}: ${answer}.`,
          ),
        ].join(" ");
        const finish = () => {
          if (speechRun.current === run) setIsSpeaking(false);
        };

        Speech.speak(text, {
          language: "sv-SE",
          onDone: finish,
          onStopped: finish,
          onError: () => {
            finish();
            if (speechRun.current === run) setSpeechError(true);
          },
        });
      } catch {
        if (speechRun.current === run) {
          setIsSpeaking(false);
          setSpeechError(true);
        }
      }
    };

    useEffect(() => {
      return () => {
        speechRun.current += 1;
        void Speech.stop().catch(() => undefined);
      };
    }, []);

    return (
      <View>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            if (isSpeaking) stopReading();
            else void startReading();
          }}
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
  },
);

export default QuestionSpeech;

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
