import { JwtPayload, verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { getAuthData } from "./auth.service";
import { UserAuth } from "../../types/custom";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const JWT_SECRET: string = process.env.JWT_SECRET as string;

interface CustomJwtPayload extends JwtPayload {
  userId: number;
  uuid: string;
}

export async function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "") as string;
    if (!token) {
      return res.status(400).send({
        message: "missing 'Authentication' header",
      });
    }

    const verifiedToken = verify(token, JWT_SECRET);
    const decoded = verifiedToken as CustomJwtPayload;
    await getAuthData(decoded.id, decoded.uuid, "ACCESS");
    req.user = new UserAuth(decoded.userId, decoded.uuid);

    return next();
  } catch (e) {
    // TODO Map prisma error
    if (e instanceof PrismaClientKnownRequestError) {
      return res.status(401).send(e);
    }
  }
}

export async function verifyRefreshToken(req: Request, res: Response, next: NextFunction) {
  const token = req.body.refreshToken as string;
  try {
    if (!token) {
      return res.status(400).send({ message: "missing field 'refreshToken'" });
    }

    const decoded = verify(token, JWT_SECRET) as CustomJwtPayload;
    await getAuthData(decoded.id, decoded.uuid, "REFRESH");
    req.user = new UserAuth(decoded.userId, decoded.uuid);

    return next();
  } catch (e) {
    // TODO Map prisma error
    if (e instanceof PrismaClientKnownRequestError) {
      return res.status(401).send(e);
    }
  }
}
