import { Router } from "express";
import * as uploadController from "@/controllers/upload.controller.js";
import uploadMiddleware from "@/middleware/upload.middleware.js";

const router: Router = Router();

router.get("/", uploadController.index);

router.post("/upload", uploadMiddleware, uploadController.upload);

router.get("/batch/:batchId", uploadController.batch);

export default router;
