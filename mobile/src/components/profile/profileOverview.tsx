import { theme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  completedCount: number;
  attemptedCount: number;
  totalCountries?: number;
  completedRegions?: number;
}

export default function ProfileOverview({
  completedCount,
  attemptedCount,
  totalCountries,
  completedRegions,
}: Props) {
  const totalPercent = totalCountries
    ? Math.min(100, (completedCount / totalCountries) * 100)
    : 0;

  return (
    <>
      <View style={styles.overviewCard}>
        <Text style={styles.cardLabel}>LÄNDER AVKLARADE</Text>
        <View style={styles.overviewCount}>
          <Text style={styles.bigNumber}>{completedCount}</Text>
          {totalCountries !== undefined && (
            <Text style={styles.totalNumber}> / {totalCountries}</Text>
          )}
        </View>
        {totalCountries !== undefined && (
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${totalPercent}%` }]}
            />
          </View>
        )}
        <Text style={styles.overviewHint}>
          {completedCount === 0
            ? "Välj en region och klara ditt första land."
            : "Fortsätt spela för att upptäcka fler länder."}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <MaterialIcons name="quiz" size={23} color={theme.colors.primary} />
          <Text style={styles.statNumber}>{attemptedCount}</Text>
          <Text style={styles.statLabel}>Länder testade</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="public" size={23} color={theme.colors.primary} />
          <Text style={styles.statNumber}>{completedRegions ?? "–"}</Text>
          <Text style={styles.statLabel}>Regioner klara</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  overviewCard: {
    padding: 22,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: theme.colors.primaryBorder,
    backgroundColor: theme.colors.white,
    elevation: 5,
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 7,
  },
  cardLabel: {
    color: theme.colors.primary,
    fontSize: 11,
    fontWeight: theme.fontWeights.extraBold,
    letterSpacing: 1.4,
  },
  overviewCount: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: theme.spacing.xs,
  },
  bigNumber: {
    color: theme.colors.heading,
    fontSize: 51,
    fontWeight: theme.fontWeights.extraBold,
  },
  totalNumber: {
    color: theme.colors.muted,
    fontSize: 23,
    fontWeight: theme.fontWeights.bold,
  },
  progressTrack: {
    height: 10,
    overflow: "hidden",
    marginTop: 10,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.primarySurfaceStrong,
  },
  progressFill: {
    height: "100%",
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.primary,
  },
  overviewHint: {
    marginTop: theme.spacing.md,
    color: theme.colors.secondary,
    fontSize: 14,
    lineHeight: 20,
  },
  statsRow: { flexDirection: "row", gap: theme.spacing.md },
  statCard: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    gap: 5,
    padding: theme.spacing.lg,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorderSoft,
    backgroundColor: theme.colors.white,
  },
  statNumber: {
    color: theme.colors.heading,
    fontSize: 26,
    fontWeight: theme.fontWeights.extraBold,
  },
  statLabel: {
    color: theme.colors.secondary,
    fontSize: 12,
    fontWeight: theme.fontWeights.semiBold,
    textAlign: "center",
  },
});
