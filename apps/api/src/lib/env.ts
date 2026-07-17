import z from "zod";
import "dotenv/config";

const envSchema = z.object({
  WEBPORT: z.string(),
  ENV_SETTING: z.string(),
  CLOUDFLARE_USER_TOKEN: z.string().min(1),
  CLOUDFLARE_ACCESS_KEY_ID: z.string().min(1),
  CLOUDFLARE_SECRET: z.string().min(1),
  CLOUDFLARE_ENDPOINT: z.url(),
  CLOUDFLARE_BUCKET: z.string().min(1),
  CLOUDFLARE_DOMAIN: z.url(),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
