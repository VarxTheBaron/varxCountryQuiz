import Constants from "expo-constants";
import { Platform } from "react-native";

const liveApiUrl = "https://quiz-api.varxthebaron.se";
const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

function getLocalApiUrl() {
  const hostUri = Constants.expoConfig?.hostUri;
  if (!hostUri) {
    throw new Error("Expo-serverns adress saknas. Ange EXPO_PUBLIC_API_URL explicit.");
  }

  const host = new URL(`http://${hostUri}`).hostname;
  const apiHost =
    Platform.OS === "android" && (host === "localhost" || host === "127.0.0.1")
      ? "10.0.2.2"
      : host;

  return `http://${apiHost}:3000`;
}

export const apiBaseUrl =
  configuredApiUrl === "auto"
    ? getLocalApiUrl()
    : (configuredApiUrl || liveApiUrl).replace(/\/+$/, "");
