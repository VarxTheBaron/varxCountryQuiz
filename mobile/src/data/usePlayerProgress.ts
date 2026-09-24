import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  getPlayerProgress,
  storePlayerProgress,
  type PlayerProgress,
} from "./playerprogress";

const defaultProgress: PlayerProgress = { xp: 0, completedCountries: [] };
// null means saved progress has not been loaded yet.
const playerProgressAtom = atom<PlayerProgress | null>(null);

export function usePlayerProgress() {
  const [progress, setProgress] = useAtom(playerProgressAtom);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (progress !== null) return;
    let cancelled = false;

    getPlayerProgress()
      .then((saved) => {
        if (!cancelled) setProgress((current) => current ?? saved);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load player progress.");
      });

    return () => {
      cancelled = true;
    };
  }, [progress, setProgress]);

  useEffect(() => {
    // Do not overwrite saved progress before it has been loaded.
    if (progress === null) return;
    let cancelled = false;

    storePlayerProgress(progress)
      .then(() => {
        if (!cancelled) setError(null);
      })
      .catch(() => {
        if (!cancelled) setError("Could not save player progress.");
      });

    return () => {
      cancelled = true;
    };
  }, [progress]);

  function addCompletedCountry(countryId: string) {
    if (!countryId.trim()) return;
    setProgress((current) => {
      if (current === null || current.completedCountries.includes(countryId)) {
        return current;
      }
      return {
        ...current,
        completedCountries: [...current.completedCountries, countryId],
      };
    });
  }

  function resetProgress() {
    setProgress((current) => (current === null ? current : defaultProgress));
  }

  return {
    addCompletedCountry,
    resetProgress,
    data: progress ?? defaultProgress,
    isLoading: progress === null && error === null,
    error,
  };
}
