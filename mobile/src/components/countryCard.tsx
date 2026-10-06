import { theme } from "@/theme";
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
                  <MaterialIcons
                    name="check-circle"
                    size={25}
                    color={theme.colors.success}
                  />
                  <Text style={styles.completedLabel}>Klar</Text>
                </>
              ) : (
                <MaterialIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.primary}
                />
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
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderWidth: 2,
    borderColor: theme.colors.primaryBorder,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.white,
    elevation: 5,
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 7,
  },
  completedCard: {
    borderColor: theme.colors.successBright,
    backgroundColor: theme.colors.successSurface,
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
    color: theme.colors.heading,
    fontSize: 18,
    fontWeight: theme.fontWeights.bold,
  },
  difficulty: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  end: {
    minWidth: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  completedLabel: {
    color: theme.colors.success,
    fontSize: 11,
    fontWeight: theme.fontWeights.bold,
  },
});
