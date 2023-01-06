import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import { upload } from "./upload.controller";

const uploadHandler = multer({ dest: "public/static/" }).single("image");
export const uploadRoute: Router = Router();

uploadRoute.post(
  "/upload",
  function (req: Request, res: Response, next: NextFunction) {
    uploadHandler(req, res, function (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: `error: failed to upload file: ${err.message}` });
      }
      next();
    });
  },
  upload,
);
