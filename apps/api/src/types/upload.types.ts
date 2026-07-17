export type ImageResponse = {
  objectKey: string;
  width: number;
  height: number;
  sizeBytes: number;
  mimeType: string;
};

export type UploadProcess =
  | {
      success: true;
      data: ImageResponse;
    }
  | {
      success: false;
      error: unknown;
    };

export type UploadResponse =
  | {
      status: "success";
      data: ImageResponse[];
      batchId: string;
    }
  | {
      status: "error";
      error: string;
    };
