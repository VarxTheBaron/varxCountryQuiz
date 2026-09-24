import { fetchRegionsAsync } from "@/api/regions";
import RegionCard from "@/components/regionCard";
import { usePlayerProgress } from "@/data/usePlayerProgress";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// RegionCard is 220 wide, with a 6-point margin on each side.
const regionCardWidth = 220 + 6 * 2;
const regionCardGap = 8;
const carouselStep = regionCardWidth + regionCardGap;

export default function Index() {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [currentRegionIndex, setCurrentRegionIndex] = useState(0);
  const { data } = usePlayerProgress();
  const query = useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegionsAsync,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text>Country Challenge!</Text>
      <Text>{data.xp}</Text>
      <Text>{data.completedCountries}</Text>
      {query.isPending && <Text>Laddar regioner...</Text>}
      {query.isError && <Text>Kunde inte hämta regioner.</Text>}
      {query.data && (
        <FlatList
          style={{ flexGrow: 0, width: "100%" }}
          onLayout={(event) => setCarouselWidth(event.nativeEvent.layout.width)}
          contentContainerStyle={{
            paddingHorizontal: Math.max(
              0,
              (carouselWidth - regionCardWidth) / 2,
            ),
          }}
          snapToOffsets={query.data.map((_: unknown, index: number) => index * carouselStep)}
          contentInsetAdjustmentBehavior="never"
          decelerationRate="fast"
          disableIntervalMomentum
          showsHorizontalScrollIndicator={false}
          data={query.data}
          extraData={currentRegionIndex}
          horizontal
          ItemSeparatorComponent={() => (
            <View style={{ width: regionCardGap, flexShrink: 0 }} />
          )}
          onScroll={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / carouselStep,
            );
            setCurrentRegionIndex(
              Math.max(0, Math.min(query.data.length - 1, index)),
            );
          }}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: regionCardWidth,
                flexShrink: 0,
                opacity: Math.abs(index - currentRegionIndex) <= 1 ? 1 : 0.25,
              }}
            >
              <RegionCard region={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <Pressable>
        <Link href="/profile">Profile</Link>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
