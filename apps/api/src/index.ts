import express from "express";
import cors from "cors";
import router from "./routes/upload.routes.js";
import { env } from "./lib/env.js";

const app = express();

const PORT = Number(env.WEBPORT) || 3000;

const allowedSites =
  env.ENV_SETTING === "prod" ? ["https://atinlang.razaris.net"] : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedSites,
  }),
);

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
