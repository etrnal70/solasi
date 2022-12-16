import { Router } from "express";
import multer from "multer";
import { upload } from "./upload.controller";

const uploadHandler = multer({ dest: "public/static/" });
export const uploadRoute: Router = Router();

uploadRoute.post("/upload", uploadHandler.single("image"), upload);
