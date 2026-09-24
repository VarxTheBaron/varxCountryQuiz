import AsyncStorage from "@react-native-async-storage/async-storage";

export type PlayerProgress = {
  xp: number;
  completedCountries: string[];
};

const playerDataKey = "playerprogress";

export async function storePlayerProgress(data: PlayerProgress) {
  try {
    await AsyncStorage.setItem(playerDataKey, JSON.stringify(data));
  } catch (e) {
    // not implemented yet
  }
}

export async function getPlayerProgress(): Promise<PlayerProgress> {
  try {
    const value = await AsyncStorage.getItem(playerDataKey);
    if (value === null) {
      await setDefaultProgress();
      return { xp: 0, completedCountries: [] };
    }

    return await JSON.parse(value);
  } catch (e) {
    return { xp: 0, completedCountries: [] };
  }
}

async function setDefaultProgress() {
  await storePlayerProgress({ xp: 0, completedCountries: [] });
}
