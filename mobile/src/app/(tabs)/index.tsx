import { fetchRegionsAsync } from "@/api/regions";
import RegionCarousel from "@/components/regionCarousel";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { theme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { progress, hasRead, loadingError } = usePlayerProgress();
  const query = useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegionsAsync,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <View style={styles.iconCircle}>
              <MaterialIcons
                name="public"
                size={37}
                color={theme.colors.primary}
              />
            </View>
            <Text style={styles.eyebrow}>UTFORSKA VÄRLDEN</Text>
            <Text style={styles.title}>Country Challenge</Text>
            <Text style={styles.subtitle}>
              Välj en region och testa dina kunskaper om länderna.
            </Text>
            <View style={styles.progressBadge}>
              <MaterialIcons
                name="emoji-events"
                size={19}
                color={theme.colors.primary}
              />
              <Text style={styles.progressText}>
                {!hasRead
                  ? loadingError
                    ? "Framsteg ej tillgängliga"
                    : "Laddar framsteg..."
                  : `${progress.completedCountries.length} länder avklarade`}
              </Text>
            </View>
          </View>

          {query.isPending && (
            <Text style={styles.status}>Laddar regioner...</Text>
          )}
          {query.isError && (
            <Text style={styles.status}>Kunde inte hämta regioner.</Text>
          )}
          {query.data && <RegionCarousel regions={query.data} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: 28,
  },
  content: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    gap: theme.spacing.xxl,
  },
  hero: {
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  iconCircle: {
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.sm,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: theme.colors.primaryBorder,
    backgroundColor: theme.colors.white,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: theme.fontWeights.extraBold,
    letterSpacing: 1.5,
  },
  title: {
    color: theme.colors.heading,
    fontSize: 31,
    fontWeight: theme.fontWeights.extraBold,
    textAlign: "center",
  },
  subtitle: {
    maxWidth: 320,
    color: theme.colors.secondary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  progressBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: theme.radii.xl,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorderSoft,
    backgroundColor: theme.colors.white,
  },
  progressText: {
    color: theme.colors.primaryDark,
    fontSize: 14,
    fontWeight: theme.fontWeights.bold,
  },
  status: {
    color: theme.colors.heading,
    fontSize: 15,
    textAlign: "center",
  },
});
