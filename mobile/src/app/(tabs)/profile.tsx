import { fetchCountriesAsync } from "@/api/countries";
import { fetchRegionsAsync } from "@/api/regions";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  const [showResetDialog, setShowResetDialog] = useState(false);
  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountriesAsync,
  });
  const regionsQuery = useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegionsAsync,
  });

  const completedCount = progress.completedCountries.length;
  const attemptedCount = progress.attemptedCountries.length;
  const totalCountries = countriesQuery.data?.length;
  const totalPercent = totalCountries
    ? Math.min(100, (completedCount / totalCountries) * 100)
    : 0;
  const completedRegions = regionsQuery.data?.filter((region) =>
    region.countries.every((countryId) =>
      progress.completedCountries.some((country) => country.id === countryId),
    ),
  ).length;

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <Modal
        visible={showResetDialog}
        transparent
        animationType="fade"
        onRequestClose={() => setShowResetDialog(false)}
      >
        <View style={styles.backdrop}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Återställa progress?</Text>
            <Text style={styles.dialogMessage}>
              Avklarade länder och bästa resultat tas bort från den här enheten.
            </Text>
            <View style={styles.dialogActions}>
              <Pressable
                onPress={() => setShowResetDialog(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Avbryt</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowResetDialog(false);
                  resetProgress();
                }}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmText}>Återställ</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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
              <View style={styles.overviewCard}>
                <Text style={styles.cardLabel}>LÄNDER AVKLARADE</Text>
                <View style={styles.overviewCount}>
                  <Text style={styles.bigNumber}>{completedCount}</Text>
                  {totalCountries !== undefined && (
                    <Text style={styles.totalNumber}> / {totalCountries}</Text>
                  )}
                </View>
                {totalCountries !== undefined && (
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${totalPercent}%` },
                      ]}
                    />
                  </View>
                )}
                <Text style={styles.overviewHint}>
                  {completedCount === 0
                    ? "Välj en region och klara ditt första land."
                    : "Fortsätt spela för att upptäcka fler länder."}
                </Text>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <MaterialIcons name="quiz" size={23} color="#4338CA" />
                  <Text style={styles.statNumber}>{attemptedCount}</Text>
                  <Text style={styles.statLabel}>Länder testade</Text>
                </View>
                <View style={styles.statCard}>
                  <MaterialIcons name="public" size={23} color="#4338CA" />
                  <Text style={styles.statNumber}>
                    {completedRegions ?? "–"}
                  </Text>
                  <Text style={styles.statLabel}>Regioner klara</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Regioner</Text>
                {regionsQuery.isPending && (
                  <Text style={styles.sectionStatus}>Laddar regioner...</Text>
                )}
                {regionsQuery.isError && (
                  <Text style={styles.sectionStatus}>
                    Kunde inte visa regionernas framsteg.
                  </Text>
                )}
                {regionsQuery.data?.map((region) => {
                  const regionCompleted = region.countries.filter((countryId) =>
                    progress.completedCountries.some(
                      (country) => country.id === countryId,
                    ),
                  ).length;
                  const regionTotal = region.countries.length;
                  const regionPercent = regionTotal
                    ? Math.min(100, (regionCompleted / regionTotal) * 100)
                    : 0;
                  const isComplete =
                    regionTotal > 0 && regionCompleted >= regionTotal;

                  return (
                    <View key={region.id} style={styles.regionCard}>
                      <View style={styles.regionHeader}>
                        <Text style={styles.regionName}>{region.name}</Text>
                        {isComplete && (
                          <MaterialIcons
                            name="check-circle"
                            size={22}
                            color="#15803D"
                          />
                        )}
                      </View>
                      <Text style={styles.regionCount}>
                        {regionCompleted} av {regionTotal} länder avklarade
                      </Text>
                      <View style={styles.regionTrack}>
                        <View
                          style={[
                            styles.regionFill,
                            { width: `${regionPercent}%` },
                          ]}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bästa resultat</Text>
                {countriesQuery.isError && attemptedCount > 0 && (
                  <Text style={styles.sectionStatus}>
                    Landnamnen kunde inte laddas just nu.
                  </Text>
                )}
                {attemptedCount === 0 ? (
                  <View style={styles.emptyCard}>
                    <Text style={styles.emptyText}>
                      Här visas dina bästa resultat när du har spelat ett quiz.
                    </Text>
                  </View>
                ) : (
                  progress.attemptedCountries.map((attempt) => {
                    const country = countriesQuery.data?.find(
                      (item) => item.id === attempt.id,
                    );
                    return (
                      <View key={attempt.id} style={styles.attemptRow}>
                        <Text style={styles.attemptFlag}>
                          {country?.flag ?? "🌍"}
                        </Text>
                        <Text style={styles.attemptName} numberOfLines={1}>
                          {country?.name ?? attempt.id}
                        </Text>
                        <Text style={styles.attemptScore}>
                          {attempt.bestAttempt} poäng
                        </Text>
                      </View>
                    );
                  })
                )}
              </View>

              <View style={styles.resetSection}>
                <Text style={styles.sectionTitle}>Börja om</Text>
                <Text style={styles.resetHint}>
                  Återställ alla avklarade länder och bästa resultat.
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setShowResetDialog(true)}
                  style={({ pressed }) => [
                    styles.resetButton,
                    pressed && styles.resetPressed,
                  ]}
                >
                  <MaterialIcons name="restart-alt" size={20} color="#B91C1C" />
                  <Text style={styles.resetText}>Återställ progress</Text>
                </Pressable>
                {saveError && (
                  <Text style={styles.saveError}>
                    Kunde inte spara din progress på enheten.
                  </Text>
                )}
              </View>
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
  overviewCard: {
    padding: 22,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#818CF8",
    backgroundColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#312E81",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 7,
  },
  cardLabel: {
    color: "#4338CA",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  overviewCount: { flexDirection: "row", alignItems: "baseline", marginTop: 4 },
  bigNumber: { color: "#1E1B4B", fontSize: 51, fontWeight: "800" },
  totalNumber: { color: "#64748B", fontSize: 23, fontWeight: "700" },
  progressTrack: {
    height: 10,
    overflow: "hidden",
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#E0E7FF",
  },
  progressFill: { height: "100%", borderRadius: 8, backgroundColor: "#4338CA" },
  overviewHint: {
    marginTop: 12,
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
  },
  statsRow: { flexDirection: "row", gap: 12 },
  statCard: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    gap: 5,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#A5B4FC",
    backgroundColor: "#FFFFFF",
  },
  statNumber: { color: "#1E1B4B", fontSize: 26, fontWeight: "800" },
  statLabel: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  section: { gap: 10, marginTop: 10 },
  sectionTitle: { color: "#1E1B4B", fontSize: 20, fontWeight: "700" },
  sectionStatus: { color: "#475569", fontSize: 14 },
  regionCard: {
    gap: 7,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C7D2FE",
    backgroundColor: "#FFFFFF",
  },
  regionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  regionName: { color: "#1E1B4B", fontSize: 16, fontWeight: "700" },
  regionCount: { color: "#64748B", fontSize: 13 },
  regionTrack: {
    height: 6,
    overflow: "hidden",
    marginTop: 3,
    borderRadius: 6,
    backgroundColor: "#E0E7FF",
  },
  regionFill: { height: "100%", borderRadius: 6, backgroundColor: "#4338CA" },
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
  attemptRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C7D2FE",
    backgroundColor: "#FFFFFF",
  },
  attemptFlag: { fontSize: 25 },
  attemptName: {
    flex: 1,
    minWidth: 0,
    color: "#1E1B4B",
    fontSize: 15,
    fontWeight: "700",
  },
  attemptScore: { color: "#4338CA", fontSize: 14, fontWeight: "700" },
  resetSection: { gap: 10, marginTop: 16 },
  resetHint: { color: "#475569", fontSize: 14, lineHeight: 20 },
  resetButton: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#FCA5A5",
    backgroundColor: "#FFFFFF",
  },
  resetPressed: { backgroundColor: "#FEF2F2" },
  resetText: { color: "#B91C1C", fontSize: 15, fontWeight: "700" },
  saveError: { color: "#B91C1C", fontSize: 13 },
  backdrop: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#00000099",
  },
  dialog: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
  },
  dialogTitle: { color: "#1E1B4B", fontSize: 20, fontWeight: "700" },
  dialogMessage: {
    marginTop: 10,
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
  },
  dialogActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  cancelText: { color: "#4338CA", fontSize: 14, fontWeight: "700" },
  confirmButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#B91C1C",
  },
  confirmText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
});
