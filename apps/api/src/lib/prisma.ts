import { env } from "./env.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client.js";

const connectionString = env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: env.PG_CA_CERT
    ? {
        ca: env.PG_CA_CERT,
      }
    : undefined,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export { prisma };
