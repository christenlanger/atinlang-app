import type { Request, Response } from "express";

import * as uploadService from "@/services/upload.service.js";

type BatchParams = {
  batchId: string;
};

// Test controller function
export function index(_: Request, res: Response) {
  return res.status(200).json({
    message: "API is running",
  });
}

// Upload controller
export async function upload(req: Request, res: Response) {
  const files = req.files as Express.Multer.File[];

  // Uncomment once in production
  const result = await uploadService.upload(files);
  //const result = await fakeUpload();

  return res.status(201).json(result);
}

// Batch viewer
export async function batch(req: Request<BatchParams>, res: Response) {
  let notFound = false;
  const { batchId } = req.params;

  if (!batchId) {
    notFound = true;
  }

  const images = await uploadService.batch(batchId);
  if (!images || images.length === 0) {
    notFound = true;
  }

  if (notFound) {
    return res.status(404).json({
      status: "error",
      error: "Not Found",
    });
  }

  return res.status(200).json({ images });
}

// Fake data for now to avoid hammering bucket
async function fakeUpload() {
  await delay(500);

  const result = {
    status: "success",
    data: [
      {
        id: "fece484d-c47d-4111-b28f-7b48ed5aaf92",
        url: "https://atinlang-images.razaris.net/fece484d-c47d-4111-b28f-7b48ed5aaf92",
        width: 2000,
        height: 1414,
        filesize: 3728885,
      },
      {
        filesize: 45952,
        height: 400,
        id: "4d4cad94-4eff-4edd-86f1-e72888f6da77",
        url: "https://atinlang-images.razaris.net/4d4cad94-4eff-4edd-86f1-e72888f6da77",
        width: 400,
      },
    ],
  };

  return result;
}

// Temporary delay helper for simulation
function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}
