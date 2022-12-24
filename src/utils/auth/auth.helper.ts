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

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "") as string;
    if (!token) {
      return res.status(400).json({
        message: "missing 'Authentication' header",
      });
    }

    verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: err });
      }
      const token = decoded as CustomJwtPayload;
      req.user = new UserAuth(token.userId, token.uuid);
      return next();
    });
  } catch (e) {
    return res.status(401).json({ message: e });
  }
}

export async function verifyAccessPair(req: Request, res: Response, next: NextFunction) {
  try {
    await getAuthData(req.user.id, req.user.uuid, "ACCESS");
    return next();
  } catch (e) {
    // TODO Map prisma error
    if (e instanceof PrismaClientKnownRequestError) {
      return res.status(401).json({ message: e });
    }
  }
}

export async function verifyRefreshPair(req: Request, res: Response, next: NextFunction) {
  const token = req.body.refreshToken as string;
  try {
    if (!token) {
      return res.status(400).json({ message: "missing field 'refreshToken'" });
    }

    const decoded = verify(token, JWT_SECRET) as CustomJwtPayload;
    await getAuthData(decoded.id, decoded.uuid, "REFRESH");
    req.user = new UserAuth(decoded.userId, decoded.uuid);

    return next();
  } catch (e) {
    // TODO Map prisma error
    if (e instanceof PrismaClientKnownRequestError) {
      return res.status(401).json({ message: e });
    }
  }
}
