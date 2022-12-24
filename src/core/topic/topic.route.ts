import { Router } from "express";
import { verifyAccessPair, verifyToken } from "../../utils/auth/auth.helper";
import { validate } from "../../utils/validate/validate.helper";
import { topicCreate, topicGet } from "./topic.controller";
import { topicInputSchema } from "./topic.schema";

export const topicRoute: Router = Router();

topicRoute.post("/topic", verifyToken, verifyAccessPair, validate(topicInputSchema), topicCreate);
topicRoute.get("/topic", topicGet);
