import { Request, Response } from "express";
import {
  deleteCredsUser,
  findUser,
  getProfileUser,
  registerUser,
  updateProfileUser,
  verifyCredsUser,
} from "./user.service";

export async function userRegister(req: Request, res: Response) {
  try {
    const data = req.body;
    await registerUser(data);

    return res.status(201).json({ message: "Success creating user" });
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}

export async function userLogin(req: Request, res: Response) {
  try {
    const data = req.body;
    const tokenPair = await verifyCredsUser(data);
    if (tokenPair instanceof Error) {
      return res.status(400).json({ message: tokenPair.message });
    }

    return res.status(200).json(tokenPair);
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}

export async function userLogout(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const result = await deleteCredsUser(userId);

    if (result.count != 0) {
      return res.status(200).json({ message: "Success logging out" });
    } else {
      return res.status(500).json({ message: "Failed to delete credentials" });
    }
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}

export async function userRefresh(_req: Request, _res: Response) {}

export async function userFind(req: Request, res: Response) {
  try {
    const { keyword } = req.query;
    const users = await findUser(keyword as string);

    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}

export async function userGetProfile(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const userProfile = await getProfileUser(parseInt(userId, 10));

    return res.status(200).json(userProfile);
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}

export async function userGetPersonalProfile(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const userProfile = await getProfileUser(userId);

    return res.status(200).json(userProfile);
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}

export async function userUpdateProfile(req: Request, res: Response) {
  try {
    const data = req.body;
    const userId = req.user.id;
    const updatedProfile = await updateProfileUser(data, userId);

    return res.status(200).json(updatedProfile);
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}
