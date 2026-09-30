import { Button, Text, View } from "react-native";
import { QuestionPack } from "../../../api/src/data/questions";

interface Props {
  questionPack: QuestionPack;
  currentQuestion: number;
  registerChoice: (choice: number) => void;
}

export default function GameContent({
  questionPack,
  currentQuestion,
  registerChoice,
}: Props) {
  return (
    <View>
      <Text>{questionPack.questions[currentQuestion].question}</Text>
      {questionPack.questions[currentQuestion].answers.map((answer, index) => (
        <Button
          key={index}
          title={answer}
          onPress={() => registerChoice(index)}
        />
      ))}
    </View>
  );
}
