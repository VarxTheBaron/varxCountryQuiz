import { atom, useAtom } from "jotai";
import { PlayerProgress } from "./playerprogress";

export function usePlayerProgress() {
  const playerProgressAtom = atom<PlayerProgress>({
    xp: 0,
    completedCountries: [],
  });

  const [data, setData] = useAtom(playerProgressAtom);

  function addCompletedCountry(countryId: string) {
    setData((current) => {
      const exists = current.completedCountries.find((c) => c === countryId);
      if (exists) return current;

      return {
        xp: current.xp,
        completedCountries: [...current.completedCountries, countryId],
      };
    });
  }

  function resetProgress() {
    setData({ xp: 0, completedCountries: [] });
  }

  return { addCompletedCountry, resetProgress, data };
}
