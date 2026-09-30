import { fetchCountriesAsync } from "@/api/countries";
import { fetchRegionsAsync } from "@/api/regions";
import ProfileBestResults from "@/components/profile/profileBestResults";
import ProfileOverview from "@/components/profile/profileOverview";
import ProfileRegionProgress from "@/components/profile/profileRegionProgress";
import ProfileReset from "@/components/profile/profileReset";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const {
    progress,
    hasRead,
    loadingError,
    saveError,
    loadProgressFromStorage,
    resetProgress,
  } = usePlayerProgress();
  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountriesAsync,
  });
  const regionsQuery = useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegionsAsync,
  });

  const completedRegions = regionsQuery.data?.filter((region) =>
    region.countries.every((countryId) =>
      progress.completedCountries.some((country) => country.id === countryId),
    ),
  ).length;

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.heading}>
            <View style={styles.profileIcon}>
              <MaterialIcons name="person-outline" size={34} color="#4338CA" />
            </View>
            <Text style={styles.eyebrow}>DIN PROFIL</Text>
            <Text style={styles.title}>Din progress</Text>
            <Text style={styles.subtitle}>
              Dina framsteg i Country Challenge på den här enheten.
            </Text>
          </View>

          {!hasRead ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                {loadingError
                  ? "Kunde inte läsa din sparade progress."
                  : "Laddar din progress..."}
              </Text>
              {loadingError && (
                <Pressable
                  onPress={loadProgressFromStorage}
                  style={styles.retryButton}
                >
                  <Text style={styles.retryText}>Försök igen</Text>
                </Pressable>
              )}
            </View>
          ) : (
            <>
              <ProfileOverview
                completedCount={progress.completedCountries.length}
                attemptedCount={progress.attemptedCountries.length}
                totalCountries={countriesQuery.data?.length}
                completedRegions={completedRegions}
              />
              <ProfileRegionProgress
                regions={regionsQuery.data}
                completedCountries={progress.completedCountries}
                isPending={regionsQuery.isPending}
                isError={regionsQuery.isError}
              />
              <ProfileBestResults
                attemptedCountries={progress.attemptedCountries}
                countries={countriesQuery.data}
                countriesError={countriesQuery.isError}
              />
              <ProfileReset onReset={resetProgress} saveError={saveError} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#C7D2FE" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 36 },
  content: { width: "100%", maxWidth: 600, alignSelf: "center", gap: 16 },
  heading: { alignItems: "center", gap: 7, marginBottom: 6 },
  profileIcon: {
    width: 62,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#818CF8",
    backgroundColor: "#FFFFFF",
  },
  eyebrow: {
    color: "#4338CA",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  title: { color: "#1E1B4B", fontSize: 30, fontWeight: "800" },
  subtitle: {
    maxWidth: 330,
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  emptyCard: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C7D2FE",
    backgroundColor: "#FFFFFF",
  },
  emptyText: { color: "#475569", fontSize: 14, lineHeight: 21 },
  retryButton: { alignSelf: "flex-start", marginTop: 14, paddingVertical: 8 },
  retryText: { color: "#4338CA", fontSize: 14, fontWeight: "700" },
});
