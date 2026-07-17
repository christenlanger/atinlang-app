import type { RequestHandler } from "express";
import multer from "multer";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (_, file, cb) => {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
      return cb(new Error("File type is not allowed"));
    }

    cb(null, true);
  },
});

const uploadMiddleware: RequestHandler = upload.array("images", 10);

export default uploadMiddleware;
