import { Router } from "express";
import { verifyAccessPair, verifyToken } from "../../utils/auth/auth.helper";
import { leaderboardGet } from "./leaderboard.controller";

export const leaderboardRoute: Router = Router();

leaderboardRoute.get("/leaderboard", verifyToken, verifyAccessPair, leaderboardGet);
