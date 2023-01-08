import { Router } from "express";
import { verifyAccessPair, verifyToken } from "../../utils/auth/auth.helper";
import { validate } from "../../utils/validate/validate.helper";
import { leaderboardGet } from "./leaderboard.controller";
import { leaderboardSchema } from "./leaderboard.schema";

export const leaderboardRoute: Router = Router();

leaderboardRoute.get("/leaderboard", verifyToken, verifyAccessPair, validate(leaderboardSchema), leaderboardGet);
