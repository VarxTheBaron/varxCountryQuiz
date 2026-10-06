import { theme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  onReset: () => void;
  saveError: boolean;
}

export default function ProfileReset({ onReset, saveError }: Props) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Modal
        visible={showDialog}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDialog(false)}
      >
        <View style={styles.backdrop}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Återställa progress?</Text>
            <Text style={styles.dialogMessage}>
              Avklarade länder och bästa resultat tas bort från den här enheten.
            </Text>
            <View style={styles.dialogActions}>
              <Pressable
                onPress={() => setShowDialog(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Avbryt</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowDialog(false);
                  onReset();
                }}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmText}>Återställ</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.resetSection}>
        <Text style={styles.sectionTitle}>Börja om</Text>
        <Text style={styles.resetHint}>
          Återställ alla avklarade länder och bästa resultat.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => setShowDialog(true)}
          style={({ pressed }) => [
            styles.resetButton,
            pressed && styles.resetPressed,
          ]}
        >
          <MaterialIcons
            name="restart-alt"
            size={20}
            color={theme.colors.danger}
          />
          <Text style={styles.resetText}>Återställ progress</Text>
        </Pressable>
        {saveError && (
          <Text style={styles.saveError}>
            Kunde inte spara din progress på enheten.
          </Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  resetSection: { gap: 10, marginTop: theme.spacing.lg },
  sectionTitle: {
    color: theme.colors.heading,
    fontSize: 20,
    fontWeight: theme.fontWeights.bold,
  },
  resetHint: { color: theme.colors.secondary, fontSize: 14, lineHeight: 20 },
  resetButton: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: theme.colors.dangerBorder,
    backgroundColor: theme.colors.white,
  },
  resetPressed: { backgroundColor: theme.colors.dangerSurface },
  resetText: {
    color: theme.colors.danger,
    fontSize: 15,
    fontWeight: theme.fontWeights.bold,
  },
  saveError: { color: theme.colors.danger, fontSize: 13 },
  backdrop: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xxl,
    backgroundColor: theme.colors.scrim,
  },
  dialog: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    padding: theme.spacing.xl,
    borderRadius: 18,
    backgroundColor: theme.colors.white,
  },
  dialogTitle: {
    color: theme.colors.heading,
    fontSize: 20,
    fontWeight: theme.fontWeights.bold,
  },
  dialogMessage: {
    marginTop: 10,
    color: theme.colors.secondary,
    fontSize: 15,
    lineHeight: 22,
  },
  dialogActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.md,
    marginTop: theme.spacing.xxl,
  },
  cancelButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.sm,
  },
  cancelText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: theme.fontWeights.bold,
  },
  confirmButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: theme.colors.danger,
  },
  confirmText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: theme.fontWeights.bold,
  },
});
