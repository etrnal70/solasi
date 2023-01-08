import { Request, Response } from "express";
import { getLeaderboard } from "./leaderboard.service";

export async function leaderboardGet(req: Request, res: Response) {
  try {
    const { order, limit } = req.query;
    if ((limit as string) == "") {
      const stats = await getLeaderboard(order as string as "asc" | "desc");

      return res.status(200).json(stats);
    } else {
      const stats = await getLeaderboard(order as string as "asc" | "desc", parseInt(limit as string, 10));

      return res.status(200).json(stats);
    }
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}
