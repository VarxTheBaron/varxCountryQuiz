import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { type Region } from "../../../api/src/data/regions";

interface Props {
  region: Region;
}

export const regionCardWidth = 220;

export default function RegionCard({ region }: Props) {
  const { progress } = usePlayerProgress();

  const isUnlocked =
    region.requiredCountries === null ||
    progress.completedCountries.filter(
      (c) => c.regionId === region.requiredCountries?.regionId,
    ).length >= region.requiredCountries.count;

  return (
    <Link
      href={{ pathname: "/region/[id]", params: { id: region.id } }}
      asChild
    >
      <Pressable
        disabled={!isUnlocked}
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        <Text style={[styles.label, !isUnlocked && styles.disabled]}>
          REGION
        </Text>
        <Text style={[styles.title, !isUnlocked && styles.disabled]}>
          {region.name}
        </Text>
        <Text style={[styles.link, !isUnlocked && styles.disabled]}>
          Utforska →
        </Text>
        {!isUnlocked && (
          <Text>
            Du behöver klara {region.requiredCountries?.count} länder i
            föregående region
          </Text>
        )}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    width: regionCardWidth,
    minHeight: 180,
    marginVertical: 12,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C7D2FE",
    backgroundColor: "#EEF2FF",
    justifyContent: "space-between",
    gap: 16,
  },
  pressed: {
    backgroundColor: "#E0E7FF",
    opacity: 0.85,
  },
  label: {
    textAlign: "center",
    color: "#4338CA",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  title: {
    textAlign: "center",
    color: "#1E1B4B",
    fontSize: 24,
    fontWeight: "700",
  },
  link: {
    textAlign: "center",
    color: "#4338CA",
    fontSize: 14,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.25,
  },
});
