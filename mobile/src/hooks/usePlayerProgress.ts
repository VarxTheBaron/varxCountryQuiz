import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect } from "react";

export type PlayerProgress = {
  xp: number;
  completedCountries: CompletedCountry[];
};

export type CompletedCountry = { id: string; regionId: string };

const defaultProgress: PlayerProgress = { xp: 0, completedCountries: [] };
const key = "playerprogress";

const playerProgressAtom = atom<PlayerProgress>(defaultProgress);
const hasLoadedAtom = atom(false);
const loadingErrorAtom = atom(false);
const saveErrorAtom = atom(false);

export function usePlayerProgress() {
  const [progress, setProgress] = useAtom(playerProgressAtom);
  const [hasRead, setHasRead] = useAtom(hasLoadedAtom);
  const [loadingError, setLoadingError] = useAtom(loadingErrorAtom);
  const [saveError, setSaveError] = useAtom(saveErrorAtom);

  const loadProgressFromStorage = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem(key);

      if (data === null) setProgress(defaultProgress);
      else setProgress(JSON.parse(data));

      setHasRead(true);
      setLoadingError(false);
    } catch (error) {
      setLoadingError(true);
    }
  }, [setProgress, setHasRead, setLoadingError]);

  const saveProgressToStorage = useCallback(async () => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(progress));
      setSaveError(false);
    } catch (error) {
      setSaveError(true);
    }
  }, [progress, setSaveError]);

  // save progress
  useEffect(() => {
    if (!hasRead) return;

    saveProgressToStorage();
  }, [hasRead, saveProgressToStorage]);

  // load progress
  useEffect(() => {
    if (hasRead) return;

    loadProgressFromStorage();
  }, [hasRead, loadProgressFromStorage]);

  const addCompletedCountry = (country: CompletedCountry) => {
    if (!hasRead || !country) return;

    setProgress((current) => {
      if (current.completedCountries.some((c) => c.id === country.id))
        return current;
      else
        return {
          ...current,
          completedCountries: [...current.completedCountries, country],
        };
    });
  };

  const resetProgress = () => {
    if (!hasRead) return;

    setProgress(defaultProgress);
  };

  return {
    progress,
    addCompletedCountry,
    resetProgress,
    loadProgressFromStorage,
    hasRead,
    loadingError,
    saveError,
  };
}
