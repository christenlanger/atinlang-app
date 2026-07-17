import type { UploadResult } from "@/context/upload/types";

export function uploadStatusMessage(res?: UploadResult): { message: string; isError: boolean } {
  if (!res) {
    return {
      message: "Did not receive a response from the server. Please try again later.",
      isError: true,
    };
  }

  if (res.status === "error") {
    return {
      message: res.error,
      isError: true,
    };
  }

  // Success
  console.log(res);
  return {
    message: "Upload success",
    isError: false,
  };
}
