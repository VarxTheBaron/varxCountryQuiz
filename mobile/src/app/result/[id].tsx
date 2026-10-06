import { fetchCountryAsync } from "@/api/countries";
import { theme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import * as Clipboard from "expo-clipboard";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { usePreventRemove } from "expo-router/react-navigation";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function readCount(value?: string) {
  if (value === undefined) return;
  return Number(value);
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

  const [goToStart, setGoToStart] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"copied" | "error">();

  const router = useRouter();

  const { data: country } = useQuery({
    queryKey: ["country", countryId],
    queryFn: () => fetchCountryAsync(countryId),
    enabled: Boolean(countryId),
  });

  const correctCount = readCount(correct);
  const totalCount = readCount(total);
  const requiredCount = readCount(required);

  const hasCounts =
    correctCount !== undefined &&
    totalCount !== undefined &&
    requiredCount !== undefined;

  const hasValidCounts =
    hasCounts &&
    correctCount <= totalCount &&
    requiredCount > 0 &&
    requiredCount <= totalCount;

  const hasQuizResult = mode === "quiz" && hasValidCounts;
  const passed = hasQuizResult && correctCount >= requiredCount;
  const isDebugResult = mode === "debug";
  const countryName = country?.name ?? "landet";

  let title = "Inget resultat att visa";
  if (hasQuizResult) title = passed ? "Landet avklarat!" : "Bra försök!";
  if (isDebugResult) title = "Landet avklarat!";

  const copyResult = async () => {
    if (!hasQuizResult) return;

    try {
      const copied = await Clipboard.setStringAsync(
        `Jag fick ${correctCount} av ${totalCount} rätt i quizet om ${countryName} i Country Challenge.`,
      );
      setCopyStatus(copied ? "copied" : "error");
    } catch {
      setCopyStatus("error");
    }
  };

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
          title: country?.name ?? "Resultat",
          headerBackVisible: false,
          gestureEnabled: false,
          headerBackButtonMenuEnabled: false,
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.card}>
            {country?.flag ? (
              <Text style={styles.flag}>{country.flag}</Text>
            ) : (
              <MaterialIcons
                name="emoji-events"
                size={56}
                color={theme.colors.primary}
              />
            )}
            <Text style={styles.eyebrow}>
              RESULTAT · {countryName.toUpperCase()}
            </Text>
            <Text style={styles.title}>{title}</Text>

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
                    color={passed ? theme.colors.success : theme.colors.warning}
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
                <MaterialIcons
                  name="check-circle"
                  size={23}
                  color={theme.colors.success}
                />
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

          {hasQuizResult && (
            <>
              <Pressable
                accessibilityRole="button"
                onPress={copyResult}
                style={({ pressed }) => [
                  styles.copyButton,
                  pressed && styles.copyPressed,
                ]}
              >
                <MaterialIcons
                  name={copyStatus === "copied" ? "check" : "content-copy"}
                  size={21}
                  color={theme.colors.primaryDark}
                />
                <Text style={styles.copyText}>
                  {copyStatus === "copied"
                    ? "Resultatet kopierat"
                    : "Kopiera resultat"}
                </Text>
              </Pressable>
              {copyStatus === "error" && (
                <Text style={styles.copyError} accessibilityLiveRegion="polite">
                  Kunde inte kopiera resultatet. Försök igen.
                </Text>
              )}
            </>
          )}

          <Pressable
            accessibilityRole="button"
            onPress={() => setGoToStart(true)}
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.startPressed,
            ]}
          >
            <Text style={styles.startText}>Till startsidan</Text>
            <MaterialIcons
              name="arrow-forward"
              size={22}
              color={theme.colors.white}
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.screen },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xxl,
  },
  content: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    gap: theme.spacing.lg,
  },
  card: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.xxl,
    paddingTop: 30,
    paddingBottom: 26,
    borderRadius: theme.radii.xxl,
    borderWidth: 2,
    borderColor: theme.colors.primaryBorder,
    backgroundColor: theme.colors.white,
    elevation: 5,
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 7,
  },
  flag: { fontSize: 62, marginBottom: 10 },
  eyebrow: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: theme.fontWeights.extraBold,
    letterSpacing: 1.4,
    textAlign: "center",
  },
  title: {
    marginTop: theme.spacing.sm,
    color: theme.colors.heading,
    fontSize: 29,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
  },
  scoreRow: { flexDirection: "row", alignItems: "baseline", marginTop: 22 },
  score: {
    color: theme.colors.primaryDark,
    fontSize: 66,
    fontWeight: theme.fontWeights.extraBold,
  },
  scoreTotal: {
    color: theme.colors.muted,
    fontSize: 28,
    fontWeight: theme.fontWeights.bold,
  },
  scoreLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: theme.fontWeights.extraBold,
    letterSpacing: 1.5,
  },
  messageBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: theme.spacing.xxl,
    padding: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
  },
  passedBox: {
    backgroundColor: theme.colors.successSurface,
    borderColor: theme.colors.successBorder,
  },
  tryAgainBox: {
    backgroundColor: theme.colors.warningSurface,
    borderColor: theme.colors.warningBorder,
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    fontWeight: theme.fontWeights.semiBold,
    lineHeight: 21,
  },
  passedText: { color: theme.colors.successDark },
  tryAgainText: { color: theme.colors.warning },
  fallbackText: {
    marginTop: theme.spacing.xl,
    color: theme.colors.secondary,
    fontSize: 15,
    textAlign: "center",
  },
  copyButton: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: theme.radii.lg,
    borderWidth: 2,
    borderColor: theme.colors.primaryBorder,
    backgroundColor: theme.colors.white,
  },
  copyPressed: { backgroundColor: theme.colors.primarySurface },
  copyText: {
    color: theme.colors.primaryDark,
    fontSize: 16,
    fontWeight: theme.fontWeights.bold,
  },
  copyError: { color: theme.colors.warning, fontSize: 14, textAlign: "center" },
  startButton: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.primary,
  },
  startPressed: { backgroundColor: theme.colors.primaryDark },
  startText: {
    color: theme.colors.white,
    fontSize: 17,
    fontWeight: theme.fontWeights.bold,
  },
});
