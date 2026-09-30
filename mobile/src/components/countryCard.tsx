import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { type Country } from "../../../api/src/data/countries";

interface Props {
  country: Country;
  completed: boolean;
}

export default function CountryCard({ country, completed }: Props) {
  return (
    <Link
      href={{ pathname: "/country/[id]", params: { id: country.id } }}
      asChild
    >
      <Pressable>
        {({ pressed }) => (
          <View
            style={[
              styles.card,
              completed && styles.completedCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.flagBox}>
              <Text style={styles.flag}>{country.flag}</Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.name} numberOfLines={1}>
                {country.name}
              </Text>
              <Text style={styles.difficulty}>
                Svårighet {country.difficulty} av 3
              </Text>
            </View>

            <View style={styles.end}>
              {completed ? (
                <>
                  <MaterialIcons name="check-circle" size={25} color="#15803D" />
                  <Text style={styles.completedLabel}>Klar</Text>
                </>
              ) : (
                <MaterialIcons name="chevron-right" size={30} color="#4338CA" />
              )}
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#818CF8",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#312E81",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 7,
  },
  completedCard: {
    borderColor: "#22C55E",
    backgroundColor: "#DCFCE7",
  },
  pressed: {
    opacity: 0.75,
  },
  flagBox: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  flag: {
    fontSize: 28,
  },
  details: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  name: {
    color: "#1E1B4B",
    fontSize: 18,
    fontWeight: "700",
  },
  difficulty: {
    color: "#64748B",
    fontSize: 14,
  },
  end: {
    minWidth: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  completedLabel: {
    color: "#15803D",
    fontSize: 11,
    fontWeight: "700",
  },
});
