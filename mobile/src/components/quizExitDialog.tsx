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
  title: {
    color: "#1E1B4B",
    fontSize: 20,
    fontFamily: "SourceSans3_700Bold",
  },
  message: {
    marginTop: 10,
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
    fontFamily: "SourceSans3_400Regular",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 24,
  },
  stayButton: {
    minHeight: 44,
    flexShrink: 1,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  stayText: {
    color: "#4338CA",
    fontSize: 14,
    fontFamily: "SourceSans3_700Bold",
  },
  leaveButton: {
    minHeight: 44,
    flexShrink: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#B91C1C",
  },
  leaveText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "SourceSans3_700Bold",
  },
});
