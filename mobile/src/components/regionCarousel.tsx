import RegionCard from "@/components/regionCard";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { type Region } from "../../../api/src/data/regions";

interface Props {
  regions: Region[];
}

export default function RegionCarousel({ regions }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentRegion = regions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === regions.length - 1;

  const previousRegion = () => {
    if (isFirst) return;
    setCurrentIndex((index) => index - 1);
  };

  const nextRegion = () => {
    if (isLast) return;
    setCurrentIndex((index) => index + 1);
  };

  if (!currentRegion) return <Text>Inga regioner att visa.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>VÄLJ REGION</Text>

      <View style={styles.row}>
        <Pressable
          onPress={previousRegion}
          disabled={isFirst}
          style={[styles.button, isFirst && styles.disabled]}
        >
          <Text style={styles.arrow}>◀</Text>
        </Pressable>

        <View style={styles.cardSlot}>
          <RegionCard region={currentRegion} />
        </View>

        <Pressable
          onPress={nextRegion}
          disabled={isLast}
          style={[styles.button, isLast && styles.disabled]}
        >
          <Text style={styles.arrow}>▶</Text>
        </Pressable>
      </View>

      <Text>
        {currentIndex + 1} / {regions.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginVertical: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1B4B",
  },
  row: {
    width: "100%",
    height: 260,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardSlot: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    overflow: "hidden",
  },
  button: {
    flexShrink: 0,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    fontSize: 24,
    color: "#4338CA",
  },
  disabled: {
    opacity: 0.25,
  },
});
