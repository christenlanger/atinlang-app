import { createContext } from "react";
import type { UploadResult } from "./types";

export type UploadContextValue = {
  result: UploadResult | null;
  loading: boolean;
  error: string | null;
  upload: (files: File[]) => Promise<UploadResult | undefined>;
};

export const UploadContext = createContext<UploadContextValue | null>(null);
