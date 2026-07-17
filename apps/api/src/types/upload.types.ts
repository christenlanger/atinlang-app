import type { UploadSuccessData } from "@atinlang/shared";

export type UploadProcess =
  | {
      success: true;
      data: UploadSuccessData;
    }
  | {
      success: false;
      error: unknown;
    };
