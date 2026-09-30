import { fetchCountryAsync } from "@/api/countries";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { usePreventRemove } from "expo-router/react-navigation";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function readCount(value: string | undefined) {
  if (!value || !/^\d+$/.test(value)) return null;
  const count = Number(value);
  return Number.isSafeInteger(count) ? count : null;
}

export default function ResultScreen() {
  const {
    id: countryId,
    mode,
    correct,
    total,
    required,
  } = useLocalSearchParams<{
    id: string;
    mode?: string;
    correct?: string;
    total?: string;
    required?: string;
  }>();
  const router = useRouter();
  const [goToStart, setGoToStart] = useState(false);
  const countryQuery = useQuery({
    queryKey: ["country", countryId],
    queryFn: () => fetchCountryAsync(countryId),
    enabled: Boolean(countryId),
  });

  const correctCount = readCount(correct);
  const totalCount = readCount(total);
  const requiredCount = readCount(required);
  const hasQuizResult =
    mode === "quiz" &&
    correctCount !== null &&
    totalCount !== null &&
    requiredCount !== null &&
    totalCount > 0 &&
    correctCount <= totalCount &&
    requiredCount > 0 &&
    requiredCount <= totalCount;
  const passed = hasQuizResult && correctCount >= requiredCount;
  const isDebugResult = mode === "debug";
  const countryName = countryQuery.data?.name ?? "landet";

  usePreventRemove(!goToStart, () => {});

  useEffect(() => {
    if (!goToStart) return;

    const frame = requestAnimationFrame(() => router.dismissTo("/"));
    return () => cancelAnimationFrame(frame);
  }, [goToStart, router]);

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <Stack.Screen
        options={{
          title: countryQuery.data?.name ?? "Resultat",
          headerBackVisible: false,
          gestureEnabled: false,
          headerBackButtonMenuEnabled: false,
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.card}>
            {countryQuery.data?.flag ? (
              <Text style={styles.flag}>{countryQuery.data.flag}</Text>
            ) : (
              <MaterialIcons name="emoji-events" size={56} color="#4338CA" />
            )}
            <Text style={styles.eyebrow}>
              RESULTAT · {countryName.toUpperCase()}
            </Text>
            <Text style={styles.title}>
              {hasQuizResult
                ? passed
                  ? "Landet avklarat!"
                  : "Bra försök!"
                : isDebugResult
                  ? "Landet avklarat!"
                  : "Inget resultat att visa"}
            </Text>

            {hasQuizResult && (
              <>
                <View style={styles.scoreRow}>
                  <Text style={styles.score}>{correctCount}</Text>
                  <Text style={styles.scoreTotal}> / {totalCount}</Text>
                </View>
                <Text style={styles.scoreLabel}>RÄTTA SVAR</Text>
                <View
                  style={[
                    styles.messageBox,
                    passed ? styles.passedBox : styles.tryAgainBox,
                  ]}
                >
                  <MaterialIcons
                    name={passed ? "check-circle" : "info-outline"}
                    size={23}
                    color={passed ? "#15803D" : "#9A3412"}
                  />
                  <Text
                    style={[
                      styles.messageText,
                      passed ? styles.passedText : styles.tryAgainText,
                    ]}
                  >
                    {passed
                      ? `Du fick minst ${requiredCount} rätt och klarade ${countryName}!`
                      : `Du behövde ${requiredCount} rätt för att klara ${countryName}.`}
                  </Text>
                </View>
              </>
            )}

            {isDebugResult && (
              <View style={[styles.messageBox, styles.passedBox]}>
                <MaterialIcons name="check-circle" size={23} color="#15803D" />
                <Text style={[styles.messageText, styles.passedText]}>
                  Landet klarades via debug-knappen. Inget poängresultat finns
                  för den här omgången.
                </Text>
              </View>
            )}

            {!hasQuizResult && !isDebugResult && (
              <Text style={styles.fallbackText}>
                Den här sidan saknar resultat från ett avslutat quiz.
              </Text>
            )}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => setGoToStart(true)}
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.startPressed,
            ]}
          >
            <Text style={styles.startText}>Till startsidan</Text>
            <MaterialIcons name="arrow-forward" size={22} color="#FFFFFF" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#C7D2FE" },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  content: { width: "100%", maxWidth: 560, alignSelf: "center", gap: 16 },
  card: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 26,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#818CF8",
    backgroundColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#312E81",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 7,
  },
  flag: { fontSize: 62, marginBottom: 10 },
  eyebrow: {
    color: "#4338CA",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.4,
    textAlign: "center",
  },
  title: {
    marginTop: 8,
    color: "#1E1B4B",
    fontSize: 29,
    fontWeight: "700",
    textAlign: "center",
  },
  scoreRow: { flexDirection: "row", alignItems: "baseline", marginTop: 22 },
  score: { color: "#312E81", fontSize: 66, fontWeight: "800" },
  scoreTotal: { color: "#64748B", fontSize: 28, fontWeight: "700" },
  scoreLabel: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  messageBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  passedBox: { backgroundColor: "#DCFCE7", borderColor: "#86EFAC" },
  tryAgainBox: { backgroundColor: "#FFEDD5", borderColor: "#FDBA74" },
  messageText: { flex: 1, fontSize: 14, fontWeight: "600", lineHeight: 21 },
  passedText: { color: "#166534" },
  tryAgainText: { color: "#9A3412" },
  fallbackText: {
    marginTop: 20,
    color: "#475569",
    fontSize: 15,
    textAlign: "center",
  },
  startButton: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 16,
    backgroundColor: "#4338CA",
  },
  startPressed: { backgroundColor: "#312E81" },
  startText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
});
