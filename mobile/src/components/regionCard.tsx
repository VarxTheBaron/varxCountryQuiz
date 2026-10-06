import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { theme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { type Region } from "../../../api/src/data/regions";

interface Props {
  region: Region;
  requiredRegionName?: string;
}

export default function RegionCard({ region, requiredRegionName }: Props) {
  const { progress } = usePlayerProgress();
  const requirement = region.requiredCountries;
  const completedRequired = requirement
    ? progress.completedCountries.filter(
        (country) => country.regionId === requirement.regionId,
      ).length
    : 0;
  const isUnlocked = !requirement || completedRequired >= requirement.count;

  return (
    <Link
      href={{ pathname: "/region/[id]", params: { id: region.id } }}
      asChild
    >
      <Pressable disabled={!isUnlocked} style={styles.pressable}>
        {({ pressed }) => (
          <View
            style={[
              styles.card,
              !isUnlocked && styles.lockedCard,
              pressed && styles.pressedCard,
            ]}
          >
            <View style={styles.cardTop}>
              <View
                style={[
                  styles.iconBadge,
                  !isUnlocked && styles.lockedIconBadge,
                ]}
              >
                <MaterialIcons
                  name={isUnlocked ? "public" : "lock-outline"}
                  size={27}
                  color={isUnlocked ? theme.colors.primary : theme.colors.muted}
                />
              </View>
              <Text style={[styles.label, !isUnlocked && styles.lockedLabel]}>
                {isUnlocked ? "REGION" : "LÅST REGION"}
              </Text>
              <Text style={styles.title}>{region.name}</Text>
            </View>

            {isUnlocked ? (
              <View style={styles.action}>
                <Text style={styles.actionText}>Utforska</Text>
                <MaterialIcons
                  name="arrow-forward"
                  size={20}
                  color={theme.colors.white}
                />
              </View>
            ) : (
              <View style={styles.lockedInfo}>
                <Text style={styles.requirementText}>
                  Klara {requirement?.count} länder i{" "}
                  {requiredRegionName ?? "förra regionen"}
                </Text>
                <Text style={styles.completedText}>
                  {completedRequired} av {requirement?.count} klara
                </Text>
              </View>
            )}
          </View>
        )}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  pressable: { width: "100%", maxWidth: 260 },
  card: {
    width: "100%",
    minHeight: 250,
    justifyContent: "space-between",
    gap: theme.spacing.lg,
    padding: 18,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: theme.colors.primaryBorder,
    backgroundColor: theme.colors.white,
    elevation: 5,
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 7,
  },
  lockedCard: {
    borderColor: theme.colors.neutralBorder,
    backgroundColor: theme.colors.neutralSurface,
    elevation: 1,
    shadowOpacity: 0.08,
  },
  pressedCard: { backgroundColor: theme.colors.primarySurface },
  cardTop: { alignItems: "center", gap: 7 },
  iconBadge: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.primarySurface,
  },
  lockedIconBadge: { backgroundColor: theme.colors.neutralFill },
  label: {
    color: theme.colors.primary,
    fontSize: 11,
    fontWeight: theme.fontWeights.extraBold,
    letterSpacing: 1.4,
  },
  lockedLabel: { color: theme.colors.muted },
  title: {
    color: theme.colors.heading,
    fontSize: 23,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
  },
  action: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 13,
    backgroundColor: theme.colors.primary,
  },
  actionText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: theme.fontWeights.bold,
  },
  lockedInfo: {
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 10,
    borderRadius: 13,
    backgroundColor: theme.colors.neutralFill,
  },
  requirementText: {
    color: theme.colors.body,
    fontSize: 12,
    fontWeight: theme.fontWeights.bold,
    lineHeight: 17,
    textAlign: "center",
  },
  completedText: {
    color: theme.colors.muted,
    fontSize: 11,
    fontWeight: theme.fontWeights.semiBold,
  },
});
