import { theme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { type Country } from "../../../api/src/data/countries";

interface Props {
  country: Country;
  completed: boolean;
  bestAttempt?: number;
  progressLoaded: boolean;
  progressError: boolean;
}

export default function CountryContent({
  country,
  completed,
  bestAttempt,
  progressLoaded,
  progressError,
}: Props) {
  return (
    <View style={styles.content}>
      <View style={styles.card}>
        <Text style={styles.flag}>{country.flag}</Text>
        <Text style={styles.eyebrow}>LANDSQUIZ</Text>
        <Text style={styles.title}>{country.name}</Text>
        <Text style={styles.description}>
          Testa dina kunskaper om {country.name} och försök slå ditt bästa
          resultat.
        </Text>

        {progressLoaded && completed && (
          <View style={styles.completedBadge}>
            <MaterialIcons name="check-circle" size={18} color={theme.colors.success} />
            <Text style={styles.completedText}>Landet är avklarat</Text>
          </View>
        )}

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>SVÅRIGHET</Text>
            <Text style={styles.statValue}>{country.difficulty} av 3</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statLabel}>BÄSTA RESULTAT</Text>
            <Text style={styles.statValue}>
              {!progressLoaded
                ? progressError
                  ? "Ej tillgängligt"
                  : "Laddar..."
                : bestAttempt === undefined
                  ? "Inte spelat"
                  : `${bestAttempt} poäng`}
            </Text>
          </View>
        </View>
      </View>

      <Link
        href={{ pathname: "/game/[id]", params: { id: country.id } }}
        asChild
      >
        <Pressable>
          {({ pressed }) => (
            <View style={[styles.startButton, pressed && styles.pressedButton]}>
              <Text style={styles.startText}>
                {completed ? "Spela igen" : "Starta quiz"}
              </Text>
              <MaterialIcons name="arrow-forward" size={22} color={theme.colors.white} />
            </View>
          )}
        </Pressable>
      </Link>
      <Text style={styles.hint}>Välj ett svar på varje fråga för att spela.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    gap: theme.spacing.lg,
  },
  card: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.xxl,
    paddingTop: 28,
    paddingBottom: theme.spacing.xxl,
    borderWidth: 2,
    borderColor: theme.colors.primaryBorder,
    borderRadius: theme.radii.xxl,
    backgroundColor: theme.colors.white,
    elevation: 5,
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 7,
  },
  flag: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: theme.fontWeights.bold,
    letterSpacing: 2,
  },
  title: {
    marginTop: theme.spacing.xs,
    color: theme.colors.heading,
    fontSize: 32,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
  },
  description: {
    marginTop: 10,
    color: theme.colors.secondary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.radii.xl,
    backgroundColor: theme.colors.successSurface,
  },
  completedText: {
    color: theme.colors.successDark,
    fontSize: 13,
    fontWeight: theme.fontWeights.semiBold,
  },
  stats: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.xxl,
    paddingTop: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutralFill,
  },
  stat: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: theme.colors.neutralFill,
  },
  statLabel: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: theme.fontWeights.bold,
    letterSpacing: 0.7,
    textAlign: "center",
  },
  statValue: {
    color: theme.colors.heading,
    fontSize: 17,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
  },
  startButton: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.primary,
  },
  pressedButton: {
    backgroundColor: theme.colors.primaryDark,
  },
  startText: {
    color: theme.colors.white,
    fontSize: 17,
    fontWeight: theme.fontWeights.bold,
  },
  hint: {
    color: theme.colors.primary,
    fontSize: 13,
    textAlign: "center",
  },
});
