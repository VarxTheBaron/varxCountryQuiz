import type { AttemptedCountry } from "@/hooks/usePlayerProgress";
import { theme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";
import type { Country } from "../../../../api/src/data/countries";

interface Props {
  attemptedCountries: AttemptedCountry[];
  countries?: Country[];
  countriesError: boolean;
}

export default function ProfileBestResults({
  attemptedCountries,
  countries,
  countriesError,
}: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Bästa resultat</Text>
      {countriesError && attemptedCountries.length > 0 && (
        <Text style={styles.sectionStatus}>
          Landnamnen kunde inte laddas just nu.
        </Text>
      )}
      {attemptedCountries.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>
            Här visas dina bästa resultat när du har spelat ett quiz.
          </Text>
        </View>
      ) : (
        attemptedCountries.map((attempt) => {
          const country = countries?.find((item) => item.id === attempt.id);
          return (
            <View key={attempt.id} style={styles.attemptRow}>
              <Text style={styles.attemptFlag}>{country?.flag ?? "🌍"}</Text>
              <Text style={styles.attemptName} numberOfLines={1}>
                {country?.name ?? attempt.id}
              </Text>
              <Text style={styles.attemptScore}>
                {attempt.bestAttempt} poäng
              </Text>
            </View>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 10, marginTop: 10 },
  sectionTitle: {
    color: theme.colors.heading,
    fontSize: 20,
    fontWeight: theme.fontWeights.bold,
  },
  sectionStatus: { color: theme.colors.secondary, fontSize: 14 },
  emptyCard: {
    padding: 18,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorderLight,
    backgroundColor: theme.colors.white,
  },
  emptyText: { color: theme.colors.secondary, fontSize: 14, lineHeight: 21 },
  attemptRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingHorizontal: 14,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorderLight,
    backgroundColor: theme.colors.white,
  },
  attemptFlag: { fontSize: 25 },
  attemptName: {
    flex: 1,
    minWidth: 0,
    color: theme.colors.heading,
    fontSize: 15,
    fontWeight: theme.fontWeights.bold,
  },
  attemptScore: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: theme.fontWeights.bold,
  },
});
