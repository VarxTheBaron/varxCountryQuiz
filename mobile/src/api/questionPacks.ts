import { QuestionPack } from "../../../api/src/data/questions";
import { apiBaseUrl } from "./baseUrl";

const baseUrl = `${apiBaseUrl}/questionpacks`;

export async function fetchQuestionPack(id: string): Promise<QuestionPack> {
  const res = await fetch(`${baseUrl}/${id}`);
  if (!res.ok) throw new Error("Could not fetch questionPack id: " + id);

  return res.json();
}
