import AsyncStorage from "@react-native-async-storage/async-storage";

export type PlayerProgress = {
  xp: number;
  completedCountries: string[];
};

const playerDataKey = "playerprogress";

export async function storePlayerProgress(data: PlayerProgress) {
  await AsyncStorage.setItem(playerDataKey, JSON.stringify(data));
}

export async function getPlayerProgress(): Promise<PlayerProgress> {
  const value = await AsyncStorage.getItem(playerDataKey);
  if (value === null) return { xp: 0, completedCountries: [] };

  const data = JSON.parse(value);
  if (
    data === null ||
    typeof data.xp !== "number" ||
    !Number.isFinite(data.xp) ||
    data.xp < 0 ||
    !Array.isArray(data.completedCountries) ||
    !data.completedCountries.every(
      (id: unknown) => typeof id === "string" && id.trim().length > 0,
    )
  ) {
    throw new Error("Invalid saved player progress");
  }

  return data;
}
