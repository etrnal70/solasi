import { Router } from "express";
import { verifyAccessToken } from "../../utils/auth/auth.helper";
import { validate } from "../../utils/validate/validate.helper";
import { questionCreate, questionFind, questionGet, questionUpdate } from "./question.controller";
import {
  questionCreateSchema,
  questionFindSchema,
  questionTopicGetSchema,
  questionUpdateSchema,
} from "./question.schema";

export const questionRoute: Router = Router();

questionRoute.post("/topic/:topicId/question", verifyAccessToken, validate(questionCreateSchema), questionCreate);
questionRoute.get("/topic/:topicId/question", verifyAccessToken, validate(questionTopicGetSchema), questionGet);
questionRoute.put("/question/:questionId", verifyAccessToken, validate(questionUpdateSchema), questionUpdate);
questionRoute.get("/question", validate(questionFindSchema), questionFind);
