import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config({
  path: "./.env",
});

app.get("/", (_, res) => {
  res.send("hello");
});

app.listen(process.env.PORT);
