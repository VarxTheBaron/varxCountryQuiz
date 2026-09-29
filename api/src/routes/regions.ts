import { Hono } from "hono";
import { countries as countryData } from "../data/countries.js";
import { regions as regionData } from "../data/regions.js";

export const regions = new Hono();

regions.get("/", (c) => c.json(regionData));

regions.get("/:id", (c) => {
  const region = regionData.find((region) => region.id === c.req.param("id"));

  if (!region) {
    return c.json({ message: "Regionen finns inte" }, 404);
  }

  return c.json(region);
});

regions.get("/:id/countries", (c) => {
  const region = regionData.find((region) => region.id === c.req.param("id"));

  if (!region) {
    return c.json({ message: "Regionen finns inte" }, 404);
  }

  const countries = countryData.filter(
    (country) => country.regionId === region.id,
  );

  return c.json(countries);
});
