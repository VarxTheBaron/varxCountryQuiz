import RegionCard from "@/components/regionCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
  const requiredRegionName = regions.find(
    (region) => region.id === currentRegion?.requiredCountries?.regionId,
  )?.name;

  const previousRegion = () => {
    if (isFirst) return;
    setCurrentIndex((index) => index - 1);
  };

  const nextRegion = () => {
    if (isLast) return;
    setCurrentIndex((index) => index + 1);
  };

  if (!currentRegion) {
    return <Text style={styles.emptyText}>Inga regioner att visa.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>VÄLJ REGION</Text>

      <View style={styles.row}>
        <Pressable
          onPress={previousRegion}
          disabled={isFirst}
          style={({ pressed }) => [
            styles.button,
            isFirst && styles.disabledButton,
            pressed && !isFirst && styles.pressedButton,
          ]}
        >
          <MaterialIcons
            name="chevron-left"
            size={32}
            color={isFirst ? "#94A3B8" : "#4338CA"}
          />
        </Pressable>

        <View style={styles.cardSlot}>
          <RegionCard
            region={currentRegion}
            requiredRegionName={requiredRegionName}
          />
        </View>

        <Pressable
          onPress={nextRegion}
          disabled={isLast}
          style={({ pressed }) => [
            styles.button,
            isLast && styles.disabledButton,
            pressed && !isLast && styles.pressedButton,
          ]}
        >
          <MaterialIcons
            name="chevron-right"
            size={32}
            color={isLast ? "#94A3B8" : "#4338CA"}
          />
        </Pressable>
      </View>

      <View style={styles.counter}>
        <Text style={styles.counterText}>
          {currentIndex + 1} av {regions.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 440,
    alignItems: "center",
    alignSelf: "center",
    gap: 14,
  },
  heading: {
    color: "#312E81",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardSlot: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
  },
  button: {
    flexShrink: 0,
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#818CF8",
    backgroundColor: "#FFFFFF",
    elevation: 3,
    shadowColor: "#312E81",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  disabledButton: {
    borderColor: "#A5B4FC",
    backgroundColor: "#E0E7FF",
    elevation: 0,
    shadowOpacity: 0,
  },
  pressedButton: {
    backgroundColor: "#EEF2FF",
  },
  counter: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: "#E0E7FF",
  },
  counterText: {
    color: "#4338CA",
    fontSize: 13,
    fontWeight: "700",
  },
  emptyText: {
    color: "#1E1B4B",
    fontSize: 15,
    textAlign: "center",
  },
});
