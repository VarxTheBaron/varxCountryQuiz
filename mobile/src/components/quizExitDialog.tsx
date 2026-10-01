import { theme } from "@/theme";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  visible: boolean;
  onStay: () => void;
  onLeave: () => void;
}

export default function QuizExitDialog({ visible, onStay, onLeave }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onStay}
    >
      <View style={styles.backdrop}>
        <View style={styles.dialog}>
          <Text style={styles.title}>Avsluta quizet?</Text>
          <Text style={styles.message}>
            Dina svar i det pågående quizet försvinner om du går tillbaka.
          </Text>
          <View style={styles.actions}>
            <Pressable onPress={onStay} style={styles.stayButton}>
              <Text style={styles.stayText}>Fortsätt spela</Text>
            </Pressable>
            <Pressable onPress={onLeave} style={styles.leaveButton}>
              <Text style={styles.leaveText}>Avsluta quiz</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  title: {
    color: theme.colors.heading,
    fontSize: 20,
    fontFamily: theme.fonts.bold,
  },
  message: {
    marginTop: 10,
    color: theme.colors.secondary,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: theme.fonts.regular,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.md,
    marginTop: theme.spacing.xxl,
  },
  stayButton: {
    minHeight: 44,
    flexShrink: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.sm,
  },
  stayText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontFamily: theme.fonts.bold,
  },
  leaveButton: {
    minHeight: 44,
    flexShrink: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.md,
    borderRadius: 10,
    backgroundColor: theme.colors.danger,
  },
  leaveText: {
    color: theme.colors.white,
    fontSize: 14,
    fontFamily: theme.fonts.bold,
  },
});
