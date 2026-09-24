import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { countries } from "./routes/countries.js";
import { questions } from "./routes/questions.js";
import { regions } from "./routes/regions.js";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
  return c.json({ message: "Country Challenge API" });
});

app.route("/regions", regions);
app.route("/countries", countries);
app.route("/questions", questions);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
