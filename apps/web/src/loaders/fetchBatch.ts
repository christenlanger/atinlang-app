import env from "@/config/env";
import type { UploadSuccessData } from "@atinlang/shared";

export default async function fetchBatch(id?: string): Promise<UploadSuccessData[] | undefined> {
  if (!id) {
    return;
  }

  try {
    const res = await fetch(`${env.API_URL}/batch/${id}`);

    if (!res.ok) {
      throw new Error("Error retrieving upload data.");
    }

    const result = await res.json();

    return result.images as UploadSuccessData[];
  } catch {
    return;
  }
}
