import { usePlayerProgress } from "@/hooks/usePlayerProgress";
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
                  color={isUnlocked ? "#4338CA" : "#64748B"}
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
                <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
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
    gap: 16,
    padding: 18,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#818CF8",
    backgroundColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#312E81",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 7,
  },
  lockedCard: {
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    elevation: 1,
    shadowOpacity: 0.08,
  },
  pressedCard: { backgroundColor: "#EEF2FF" },
  cardTop: { alignItems: "center", gap: 7 },
  iconBadge: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
  },
  lockedIconBadge: { backgroundColor: "#E2E8F0" },
  label: {
    color: "#4338CA",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  lockedLabel: { color: "#64748B" },
  title: {
    color: "#1E1B4B",
    fontSize: 23,
    fontWeight: "700",
    textAlign: "center",
  },
  action: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 13,
    backgroundColor: "#4338CA",
  },
  actionText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  lockedInfo: {
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 10,
    borderRadius: 13,
    backgroundColor: "#E2E8F0",
  },
  requirementText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
    textAlign: "center",
  },
  completedText: { color: "#64748B", fontSize: 11, fontWeight: "600" },
});
