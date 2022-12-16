import { Request, Response } from "express";

export async function upload(req: Request, res: Response) {
  const file = req.file;
  if (file !== undefined) {
    const DOMAIN = process.env.DOMAIN as string;
    const PORT = process.env.PORT as string;
    const HOST = process.env.HOST as string;
    if (DOMAIN === "") {
      return res.status(201).json({ url: `http://${HOST}:${PORT}/${file.filename}` });
    } else {
      return res.status(201).json({ url: `http://${DOMAIN}/${file.filename}` });
    }
  }

  return res.status(500).json({ message: "Error uploading file" });
}
