import { useCallback, useState } from "react";

import type { UploadResult } from "@atinlang/shared";
import { UploadContext, type UploadContextValue } from "./UploadContext";
import env from "@/config/env";

const validFiles = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export default function UploadProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);

  // Validate files before upload
  const validateFiles = (files: File[]): boolean => {
    for (const file of files) {
      if (!validFiles.includes(file.type)) {
        return false;
      }
    }

    return true;
  };

  // Upload function
  const upload = useCallback(async (files: File[]) => {
    setError(null);

    if (!files?.length) return;

    if (!validateFiles(files)) {
      const errorMsg = "Only jpeg, png, gif, or webp files are accepted.";
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    // Upload files
    try {
      setLoading(true);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(`${env.API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const res = (await response.json()) as UploadResult;

      setResult(res);

      return res;
    } catch (err) {
      throw new Error(
        err instanceof Error
          ? err.message
          : "An error was encountered when trying to upload the images.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const context: UploadContextValue = { result, loading, error, upload };

  return <UploadContext.Provider value={context}>{children}</UploadContext.Provider>;
}
