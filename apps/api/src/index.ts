import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
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

// Check for database
const dbPath = "./dev.db";
console.log("cwd:", process.cwd());
console.log("resolved db with:", path.resolve(dbPath));
console.log("exists:", fs.existsSync(dbPath));

// Listen
app.listen(PORT, () => {
  console.log(`Database available on ${env.DATABASE_URL}`);
  console.log(`Listening on port ${PORT}`);
});
