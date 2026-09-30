import { usePlayerProgress } from "@/hooks/usePlayerProgress";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const { resetProgress, hasRead, saveError, loadingError, progress } =
    usePlayerProgress();
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Text>{JSON.stringify(progress)}</Text>
      <Text>hasread: {hasRead ? "yes" : "no"}</Text>
      <Text>saveError: {saveError ? "yes" : "no"}</Text>
      <Text>loadError: {loadingError ? "yes" : "no"}</Text>
      <Button
        title="Återställ progress"
        onPress={resetProgress}
        disabled={!hasRead}
      />
      {saveError && <Text>Kunde inte spara återställningen.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
