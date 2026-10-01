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
                    color="#15803D"
                  />
                )}
                {isWrongChoice && (
                  <MaterialIcons name="cancel" size={23} color="#B91C1C" />
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
              color={answeredCorrectly ? "#15803D" : "#9A3412"}
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
            <MaterialIcons name="arrow-forward" size={22} color="#FFFFFF" />
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { width: "100%", gap: 16 },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    color: "#312E81",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  progressCount: { color: "#4338CA", fontSize: 14, fontWeight: "700" },
  progressTrack: { flexDirection: "row", gap: 6, height: 7 },
  progressStep: { flex: 1, borderRadius: 8, backgroundColor: "#A5B4FC" },
  progressStepActive: { backgroundColor: "#4338CA" },
  questionCard: {
    marginTop: 8,
    padding: 22,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#818CF8",
    elevation: 4,
    shadowColor: "#312E81",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
  },
  questionEyebrow: {
    color: "#4338CA",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  questionText: {
    marginTop: 10,
    color: "#1E1B4B",
    fontSize: 23,
    fontWeight: "700",
    lineHeight: 31,
  },
  answers: { gap: 11 },
  answerButton: {
    minHeight: 64,
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#E0E7FF",
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#312E81",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  answerPressed: { borderColor: "#6366F1", backgroundColor: "#EEF2FF" },
  answerCorrect: { borderColor: "#22C55E", backgroundColor: "#F0FDF4" },
  answerWrong: { borderColor: "#EF4444", backgroundColor: "#FEF2F2" },
  answerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  answerLetter: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
  },
  letterCorrect: { backgroundColor: "#DCFCE7" },
  letterWrong: { backgroundColor: "#FEE2E2" },
  answerLetterText: { color: "#4338CA", fontSize: 14, fontWeight: "800" },
  letterCorrectText: { color: "#15803D" },
  letterWrongText: { color: "#B91C1C" },
  answerText: {
    flex: 1,
    color: "#1E1B4B",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 23,
  },
  feedback: {
    flexDirection: "row",
    gap: 11,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  feedbackCorrect: { backgroundColor: "#DCFCE7", borderColor: "#86EFAC" },
  feedbackWrong: { backgroundColor: "#FFEDD5", borderColor: "#FDBA74" },
  feedbackCopy: { flex: 1, gap: 3 },
  feedbackTitle: { fontSize: 16, fontWeight: "800" },
  feedbackCorrectText: { color: "#166534" },
  feedbackWrongText: { color: "#9A3412" },
  feedbackDetail: { color: "#334155", fontSize: 14, lineHeight: 20 },
  continueButton: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 16,
    backgroundColor: "#4338CA",
  },
  continuePressed: { backgroundColor: "#312E81" },
  continueText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  emptyText: { color: "#1E1B4B", fontSize: 16, textAlign: "center" },
});
