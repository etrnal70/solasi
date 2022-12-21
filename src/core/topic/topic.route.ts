import { Router } from "express";
import { verifyAccessToken } from "../../utils/auth/auth.helper";
import { validate } from "../../utils/validate/validate.helper";
import { topicCreate, topicGet } from "./topic.controller";
import { topicInputSchema } from "./topic.schema";

export const topicRoute: Router = Router();

topicRoute.post("/topic", verifyAccessToken, validate(topicInputSchema), topicCreate);
topicRoute.get("/topic", topicGet);
