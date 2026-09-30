const baseUrl = "https://quiz-api.varxthebaron.se/questionpacks";

export async function fetchQuestionPack(id: string) {
  const res = await fetch(`${baseUrl}/${id}`);
  if (!res.ok) throw new Error("Could not fetch questionPack id: " + id);

  return res.json();
}
