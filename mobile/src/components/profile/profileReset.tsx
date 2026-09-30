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
  );
}

const styles = StyleSheet.create({
  resetSection: { gap: 10, marginTop: 16 },
  sectionTitle: { color: "#1E1B4B", fontSize: 20, fontWeight: "700" },
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
