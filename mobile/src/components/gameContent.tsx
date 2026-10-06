import { theme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { QuestionPack } from "../../../api/src/data/questions";
import QuestionSpeech, { type QuestionSpeechHandle } from "./questionSpeech";

interface Props {
  questionPack: QuestionPack;
  currentQuestion: number;
  selectedChoice: number | null;
  registerChoice: (choice: number) => void;
  continueQuiz: () => void;
}

export default function GameContent({
  questionPack,
  currentQuestion,
  selectedChoice,
  registerChoice,
  continueQuiz,
}: Props) {
  const question = questionPack.questions[currentQuestion];
  const totalQuestions = questionPack.questions.length;
  const speechRef = useRef<QuestionSpeechHandle>(null);

  if (!question) {
    return (
      <Text style={styles.emptyText}>Det finns inga frågor att visa.</Text>
    );
  }

  const hasAnswered = selectedChoice !== null;
  const answeredCorrectly = selectedChoice === question.correctAnswer;

  return (
    <View style={styles.content}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>
          FRÅGA {currentQuestion + 1} AV {totalQuestions}
        </Text>
        <Text style={styles.progressCount}>
          {currentQuestion + 1}/{totalQuestions}
        </Text>
      </View>
      <View
        style={styles.progressTrack}
        accessibilityLabel={`Fråga ${currentQuestion + 1} av ${totalQuestions}`}
      >
        {questionPack.questions.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.progressStep,
              index <= currentQuestion && styles.progressStepActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionEyebrow}>VÄLJ ETT SVAR</Text>
        <Text style={styles.questionText}>{question.question}</Text>
        {!hasAnswered && (
          <QuestionSpeech
            key={question.id}
            ref={speechRef}
            question={question}
          />
        )}
      </View>

      <View style={styles.answers}>
        {question.answers.map((answer, index) => {
          const isCorrect = hasAnswered && index === question.correctAnswer;
          const isWrongChoice =
            hasAnswered && index === selectedChoice && !answeredCorrectly;

          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={{
                disabled: hasAnswered,
                selected: index === selectedChoice,
              }}
              disabled={hasAnswered}
              onPress={() => {
                speechRef.current?.stop();
                registerChoice(index);
              }}
              style={({ pressed }) => [
                styles.answerButton,
                pressed && styles.answerPressed,
                isCorrect && styles.answerCorrect,
                isWrongChoice && styles.answerWrong,
              ]}
            >
              <View style={styles.answerRow}>
                <View
                  style={[
                    styles.answerLetter,
                    isCorrect && styles.letterCorrect,
                    isWrongChoice && styles.letterWrong,
                  ]}
                >
                  <Text
                    style={[
                      styles.answerLetterText,
                      isCorrect && styles.letterCorrectText,
                      isWrongChoice && styles.letterWrongText,
                    ]}
                  >
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={styles.answerText}>{answer}</Text>
                {isCorrect && (
                  <MaterialIcons
                    name="check-circle"
                    size={23}
                    color={theme.colors.success}
                  />
                )}
                {isWrongChoice && (
                  <MaterialIcons
                    name="cancel"
                    size={23}
                    color={theme.colors.danger}
                  />
                )}
              </View>
            </Pressable>
          );
        })}
      </View>

      {hasAnswered && (
        <>
          <View
            style={[
              styles.feedback,
              answeredCorrectly ? styles.feedbackCorrect : styles.feedbackWrong,
            ]}
            accessibilityRole="alert"
          >
            <MaterialIcons
              name={answeredCorrectly ? "celebration" : "info-outline"}
              size={23}
              color={
                answeredCorrectly ? theme.colors.success : theme.colors.warning
              }
            />
            <View style={styles.feedbackCopy}>
              <Text
                style={[
                  styles.feedbackTitle,
                  answeredCorrectly
                    ? styles.feedbackCorrectText
                    : styles.feedbackWrongText,
                ]}
              >
                {answeredCorrectly ? "Rätt svar!" : "Inte riktigt"}
              </Text>
              <Text style={styles.feedbackDetail}>
                {answeredCorrectly
                  ? "Snyggt jobbat!"
                  : `Rätt svar är ${question.answers[question.correctAnswer]}.`}
              </Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={continueQuiz}
            style={({ pressed }) => [
              styles.continueButton,
              pressed && styles.continuePressed,
            ]}
          >
            <Text style={styles.continueText}>
              {currentQuestion === totalQuestions - 1
                ? "Visa resultat"
                : "Nästa fråga"}
            </Text>
            <MaterialIcons
              name="arrow-forward"
              size={22}
              color={theme.colors.white}
            />
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { width: "100%", gap: theme.spacing.lg },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    color: theme.colors.primaryDark,
    fontSize: 12,
    fontFamily: theme.fonts.extraBold,
    letterSpacing: 1.2,
  },
  progressCount: {
    color: theme.colors.primary,
    fontSize: 14,
    fontFamily: theme.fonts.bold,
  },
  progressTrack: { flexDirection: "row", gap: 6, height: 7 },
  progressStep: {
    flex: 1,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.primaryBorderSoft,
  },
  progressStepActive: { backgroundColor: theme.colors.primary },
  questionCard: {
    marginTop: theme.spacing.sm,
    padding: 22,
    borderRadius: 22,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.primaryBorder,
    elevation: 4,
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
  },
  questionEyebrow: {
    color: theme.colors.primary,
    fontSize: 11,
    fontFamily: theme.fonts.extraBold,
    letterSpacing: 1.4,
  },
  questionText: {
    marginTop: 10,
    color: theme.colors.heading,
    fontSize: 23,
    fontFamily: theme.fonts.bold,
    lineHeight: 31,
  },
  answers: { gap: 11 },
  answerButton: {
    minHeight: 64,
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: theme.spacing.md,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: theme.colors.primarySurfaceStrong,
    backgroundColor: theme.colors.white,
    elevation: 2,
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  answerPressed: {
    borderColor: theme.colors.primaryBright,
    backgroundColor: theme.colors.primarySurface,
  },
  answerCorrect: {
    borderColor: theme.colors.successBright,
    backgroundColor: theme.colors.successSurfaceLight,
  },
  answerWrong: {
    borderColor: theme.colors.dangerBright,
    backgroundColor: theme.colors.dangerSurface,
  },
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  answerLetter: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primarySurface,
  },
  letterCorrect: { backgroundColor: theme.colors.successSurface },
  letterWrong: { backgroundColor: theme.colors.dangerSurfaceStrong },
  answerLetterText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontFamily: theme.fonts.extraBold,
  },
  letterCorrectText: { color: theme.colors.success },
  letterWrongText: { color: theme.colors.danger },
  answerText: {
    flex: 1,
    color: theme.colors.heading,
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    lineHeight: 23,
  },
  feedback: {
    flexDirection: "row",
    gap: 11,
    padding: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
  },
  feedbackCorrect: {
    backgroundColor: theme.colors.successSurface,
    borderColor: theme.colors.successBorder,
  },
  feedbackWrong: {
    backgroundColor: theme.colors.warningSurface,
    borderColor: theme.colors.warningBorder,
  },
  feedbackCopy: { flex: 1, gap: 3 },
  feedbackTitle: { fontSize: 16, fontFamily: theme.fonts.extraBold },
  feedbackCorrectText: { color: theme.colors.successDark },
  feedbackWrongText: { color: theme.colors.warning },
  feedbackDetail: {
    color: theme.colors.body,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: theme.fonts.regular,
  },
  continueButton: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.primary,
  },
  continuePressed: { backgroundColor: theme.colors.primaryDark },
  continueText: {
    color: theme.colors.white,
    fontSize: 17,
    fontFamily: theme.fonts.bold,
  },
  emptyText: {
    color: theme.colors.heading,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    textAlign: "center",
  },
});
