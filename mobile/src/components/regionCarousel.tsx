import RegionCard from "@/components/regionCard";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { type Region } from "../../../api/src/data/regions";

interface Props {
  regions: Region[];
}

// RegionCard is 220 wide, with a 6-point margin on each side.
const regionCardWidth = 220 + 6 * 2;
const regionCardGap = 8;
const carouselStep = regionCardWidth + regionCardGap;

export default function RegionCarousel({ regions }: Props) {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [currentRegionIndex, setCurrentRegionIndex] = useState(0);

  return (
    <FlatList
      style={{ flexGrow: 0, width: "100%" }}
      onLayout={(event) => setCarouselWidth(event.nativeEvent.layout.width)}
      contentContainerStyle={{
        paddingHorizontal: Math.max(
          0,
          (carouselWidth - regionCardWidth) / 2,
        ),
      }}
      snapToOffsets={regions.map(
        (_, index) => index * carouselStep,
      )}
      contentInsetAdjustmentBehavior="never"
      decelerationRate="fast"
      disableIntervalMomentum
      showsHorizontalScrollIndicator={false}
      data={regions}
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
          Math.max(0, Math.min(regions.length - 1, index)),
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
  );
}
