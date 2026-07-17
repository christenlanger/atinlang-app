import { useContext } from "react";
import { UploadContext } from "./UploadContext";

export function useUpload() {
  const context = useContext(UploadContext);

  if (!context) throw new Error("Unable to load UploadContext without UploadProvider.");

  return context;
}
