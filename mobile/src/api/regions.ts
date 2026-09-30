import { Country } from "../../../api/src/data/countries";
import { apiBaseUrl } from "./baseUrl";

const baseUrl = `${apiBaseUrl}/regions`;

export async function fetchRegionsAsync() {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error("Could not fetch region data.");

  return res.json();
}

export async function fetchSingleRegionAsync(id: string) {
  const res = await fetch(`${baseUrl}/${id}`);
  if (!res.ok) throw new Error("Could not fetch region id: " + id);

  return res.json();
}

export async function fetchCountriesByRegionAsync(
  regionId: string,
): Promise<Country[]> {
  const res = await fetch(`${baseUrl}/${regionId}/countries`);
  if (!res.ok) throw new Error("Could not fetch region id: " + regionId);

  return res.json();
}
