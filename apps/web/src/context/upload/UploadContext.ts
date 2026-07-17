import { createContext } from "react";
import type { UploadResult } from "@atinlang/shared";

export type UploadContextValue = {
  result: UploadResult | null;
  loading: boolean;
  error: string | null;
  upload: (files: File[]) => Promise<UploadResult | undefined>;
};

export const UploadContext = createContext<UploadContextValue | null>(null);
