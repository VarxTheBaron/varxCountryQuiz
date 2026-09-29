import { Hono } from "hono";
import { questionPacks as packData } from "../data/questions.js";

export const questionPacks = new Hono();

questionPacks.get("/:id", (c) => {
  const pack = packData.find((pack) => pack.id === c.req.param("id"));

  if (!pack) {
    return c.json({ message: "Frågepaketet finns inte" }, 404);
  }

  return c.json(pack);
});
