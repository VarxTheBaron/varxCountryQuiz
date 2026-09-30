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
            <View style={[styles.progressFill, { width: `${totalPercent}%` }]} />
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
          <MaterialIcons name="quiz" size={23} color="#4338CA" />
          <Text style={styles.statNumber}>{attemptedCount}</Text>
          <Text style={styles.statLabel}>Länder testade</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="public" size={23} color="#4338CA" />
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
    borderColor: "#818CF8",
    backgroundColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#312E81",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 7,
  },
  cardLabel: {
    color: "#4338CA",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  overviewCount: { flexDirection: "row", alignItems: "baseline", marginTop: 4 },
  bigNumber: { color: "#1E1B4B", fontSize: 51, fontWeight: "800" },
  totalNumber: { color: "#64748B", fontSize: 23, fontWeight: "700" },
  progressTrack: {
    height: 10,
    overflow: "hidden",
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#E0E7FF",
  },
  progressFill: { height: "100%", borderRadius: 8, backgroundColor: "#4338CA" },
  overviewHint: {
    marginTop: 12,
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
  },
  statsRow: { flexDirection: "row", gap: 12 },
  statCard: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    gap: 5,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#A5B4FC",
    backgroundColor: "#FFFFFF",
  },
  statNumber: { color: "#1E1B4B", fontSize: 26, fontWeight: "800" },
  statLabel: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
