import { Request, Response } from "express";

export async function upload(req: Request, res: Response) {
  const file = req.file;
  if (file !== undefined) {
    if (process.env.DOMAIN == "" || process.env.DOMAIN === undefined) {
      return res.status(201).json({ url: `http://${process.env.HOST}:${process.env.PORT}/static/${file.filename}` });
    } else {
      return res.status(201).json({ url: `http://${process.env.DOMAIN}/static/${file.filename}` });
    }
  }

  return res.status(500).json({ message: "Error uploading file" });
}
