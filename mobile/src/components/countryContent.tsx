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
            <MaterialIcons name="check-circle" size={18} color="#15803D" />
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
              <MaterialIcons name="arrow-forward" size={22} color="#FFFFFF" />
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
    gap: 16,
  },
  card: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    borderWidth: 2,
    borderColor: "#818CF8",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#312E81",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 7,
  },
  flag: {
    fontSize: 64,
    marginBottom: 12,
  },
  eyebrow: {
    color: "#4338CA",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
  },
  title: {
    marginTop: 4,
    color: "#1E1B4B",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    marginTop: 10,
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#DCFCE7",
  },
  completedText: {
    color: "#166534",
    fontSize: 13,
    fontWeight: "600",
  },
  stats: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  stat: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: "#E2E8F0",
  },
  statLabel: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.7,
    textAlign: "center",
  },
  statValue: {
    color: "#1E1B4B",
    fontSize: 17,
    fontWeight: "700",
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
  pressedButton: {
    backgroundColor: "#312E81",
  },
  startText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  hint: {
    color: "#4338CA",
    fontSize: 13,
    textAlign: "center",
  },
});
