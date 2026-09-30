import { fetchRegionsAsync } from "@/api/regions";
import RegionCarousel from "@/components/regionCarousel";
import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { progress, hasRead, loadingError } = usePlayerProgress();
  const query = useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegionsAsync,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="public" size={37} color="#4338CA" />
            </View>
            <Text style={styles.eyebrow}>UTFORSKA VÄRLDEN</Text>
            <Text style={styles.title}>Country Challenge</Text>
            <Text style={styles.subtitle}>
              Välj en region och testa dina kunskaper om länderna.
            </Text>
            <View style={styles.progressBadge}>
              <MaterialIcons name="emoji-events" size={19} color="#4338CA" />
              <Text style={styles.progressText}>
                {!hasRead
                  ? loadingError
                    ? "Framsteg ej tillgängliga"
                    : "Laddar framsteg..."
                  : `${progress.completedCountries.length} länder avklarade`}
              </Text>
            </View>
          </View>

          {query.isPending && (
            <Text style={styles.status}>Laddar regioner...</Text>
          )}
          {query.isError && (
            <Text style={styles.status}>Kunde inte hämta regioner.</Text>
          )}
          {query.data && <RegionCarousel regions={query.data} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7D2FE",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  content: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    gap: 24,
  },
  hero: {
    alignItems: "center",
    gap: 8,
  },
  iconCircle: {
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderRadius: 22,
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
  title: {
    color: "#1E1B4B",
    fontSize: 31,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    maxWidth: 320,
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  progressBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#A5B4FC",
    backgroundColor: "#FFFFFF",
  },
  progressText: {
    color: "#312E81",
    fontSize: 14,
    fontWeight: "700",
  },
  status: {
    color: "#1E1B4B",
    fontSize: 15,
    textAlign: "center",
  },
});
