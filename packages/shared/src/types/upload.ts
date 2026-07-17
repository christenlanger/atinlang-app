export type UploadSuccessData = {
  objectKey: string;
  width: number;
  height: number;
  sizeBytes: number;
  mimeType: string;
};

export type UploadResult =
  | {
      status: "success";
      data: UploadSuccessData[];
      batchId: string;
    }
  | {
      status: "error";
      error: string;
    };
