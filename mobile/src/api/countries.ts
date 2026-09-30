import { apiBaseUrl } from "./baseUrl";

const baseUrl = `${apiBaseUrl}/countries`;

export async function fetchCountriesAsync() {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error("Could not fetch countries data.");

  return res.json();
}

export async function fetchCountryAsync(id: string) {
  const res = await fetch(`${baseUrl}/${id}`);
  if (!res.ok) throw new Error("Could not fetch country id: " + id);

  return res.json();
}
