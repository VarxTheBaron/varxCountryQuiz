const baseUrl = "https://quiz-api.varxthebaron.se/regions";

export async function fetchRegionsAsync() {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error("Could not fetch region data.");

  return res.json();
}
