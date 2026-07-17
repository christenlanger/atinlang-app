import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/lib/env.js";
import { s3 } from "@/lib/aws.js";
import { prisma } from "@/lib/prisma.js";
import sharp from "sharp";
import type { Image } from "@/generated/prisma/client.js";
import type { UploadSuccessData, UploadResult } from "@atinlang/shared";
import type { UploadProcess } from "@/types/upload.types.js";

type UploadImage = Pick<Image, "objectKey" | "width" | "height" | "sizeBytes" | "mimeType">;

// Upload images
export async function upload(files: Express.Multer.File[]): Promise<UploadResult> {
  let batchId: string;

  const uploadPromises = files.map(async (file): Promise<UploadProcess> => {
    const key = crypto.randomUUID();

    try {
      // Record metadata
      const metadata = await sharp(file.buffer).metadata();

      // Upload to R2 bucket
      await s3.send(
        new PutObjectCommand({
          Bucket: env.CLOUDFLARE_BUCKET,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          CacheControl: "public, max-age=31536000, immutable",
        }),
      );

      // Return result
      return {
        success: true,
        data: {
          objectKey: key,
          width: metadata.width,
          height: metadata.height,
          sizeBytes: file.size,
          mimeType: file.mimetype,
        },
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  });

  // Wait for all uploads to finish
  const uploadResults = await Promise.all(uploadPromises);

  const imageData = uploadResults.filter((result) => result.success).map((result) => result.data);

  if (imageData?.length === 0) {
    return {
      status: "error",
      error: "Images failed to upload.",
    };
  }

  // Create the batch along with the image entries
  try {
    // Create an upload batch
    const batch = await prisma.batch.create({
      data: {
        images: {
          createMany: {
            data: imageData as UploadImage[],
          },
        },
      },
      select: { id: true },
    });

    batchId = batch.id;
  } catch (error) {
    // Delete all the uploaded images due to db failure
    const deletePromises = imageData.map(async (image) => {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: env.CLOUDFLARE_BUCKET,
          Key: image?.objectKey,
        }),
      );
    });

    await Promise.all(deletePromises);

    return {
      status: "error",
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }

  return {
    status: "success",
    data: imageData,
    batchId,
  };
}

// Retrieve batch data
export async function batch(batchId: string): Promise<UploadSuccessData[] | undefined> {
  try {
    const batch = await prisma.batch.findUnique({
      where: {
        id: batchId,
      },
      select: {
        images: {
          select: {
            objectKey: true,
            width: true,
            height: true,
            sizeBytes: true,
            mimeType: true,
          },
        },
      },
    });

    return batch?.images;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unexpected error.");
  }
}
