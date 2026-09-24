import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { type Region } from "../../../api/src/data/regions";

interface Props {
  region: Region;
}

const RegionCard = ({ region }: Props) => {
  return (
    <Link href={`/region/${region.id}`} asChild>
      <Pressable
        accessibilityLabel={`Visa ${region.name}`}
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        <Text style={styles.label}>REGION</Text>
        <Text style={styles.title}>{region.name}</Text>
        <Text style={styles.link}>Utforska →</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    minHeight: 180,
    alignSelf: "flex-start",
    marginHorizontal: 6,
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
});

export default RegionCard;
