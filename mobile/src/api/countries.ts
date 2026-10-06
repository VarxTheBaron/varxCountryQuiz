import type { Country } from "../../../api/src/data/countries";
import { apiBaseUrl } from "./baseUrl";

const baseUrl = `${apiBaseUrl}/countries`;

export async function fetchCountriesAsync(): Promise<Country[]> {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error("Could not fetch countries data.");

  return res.json();
}

export async function fetchCountryAsync(id: string): Promise<Country> {
  const res = await fetch(`${baseUrl}/${id}`);
  if (!res.ok) throw new Error("Could not fetch country id: " + id);

  return res.json();
}
