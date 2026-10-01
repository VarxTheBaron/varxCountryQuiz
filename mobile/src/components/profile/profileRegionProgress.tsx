import { theme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, View } from "react-native";
import type { Region } from "../../../../api/src/data/regions";
import type { CompletedCountry } from "@/hooks/usePlayerProgress";

interface Props {
  regions?: Region[];
  completedCountries: CompletedCountry[];
  isPending: boolean;
  isError: boolean;
}

export default function ProfileRegionProgress({
  regions,
  completedCountries,
  isPending,
  isError,
}: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Regioner</Text>
      {isPending && <Text style={styles.sectionStatus}>Laddar regioner...</Text>}
      {isError && (
        <Text style={styles.sectionStatus}>
          Kunde inte visa regionernas framsteg.
        </Text>
      )}
      {regions?.map((region) => {
        const regionCompleted = region.countries.filter((countryId) =>
          completedCountries.some((country) => country.id === countryId),
        ).length;
        const regionTotal = region.countries.length;
        const regionPercent = regionTotal
          ? Math.min(100, (regionCompleted / regionTotal) * 100)
          : 0;
        const isComplete = regionTotal > 0 && regionCompleted >= regionTotal;

        return (
          <View key={region.id} style={styles.regionCard}>
            <View style={styles.regionHeader}>
              <Text style={styles.regionName}>{region.name}</Text>
              {isComplete && (
                <MaterialIcons
                  name="check-circle"
                  size={22}
                  color={theme.colors.success}
                />
              )}
            </View>
            <Text style={styles.regionCount}>
              {regionCompleted} av {regionTotal} länder avklarade
            </Text>
            <View style={styles.regionTrack}>
              <View
                style={[styles.regionFill, { width: `${regionPercent}%` }]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 10, marginTop: 10 },
  sectionTitle: { color: theme.colors.heading, fontSize: 20, fontWeight: theme.fontWeights.bold },
  sectionStatus: { color: theme.colors.secondary, fontSize: 14 },
  regionCard: {
    gap: 7,
    padding: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorderLight,
    backgroundColor: theme.colors.white,
  },
  regionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  regionName: { color: theme.colors.heading, fontSize: 16, fontWeight: theme.fontWeights.bold },
  regionCount: { color: theme.colors.muted, fontSize: 13 },
  regionTrack: {
    height: 6,
    overflow: "hidden",
    marginTop: 3,
    borderRadius: 6,
    backgroundColor: theme.colors.primarySurfaceStrong,
  },
  regionFill: { height: "100%", borderRadius: 6, backgroundColor: theme.colors.primary },
});
