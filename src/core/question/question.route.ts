import { Router } from "express";
import { verifyAccessPair, verifyToken } from "../../utils/auth/auth.helper";
import { validate } from "../../utils/validate/validate.helper";
import { questionCreate, questionFind, questionGet, questionUpdate } from "./question.controller";
import {
  questionCreateSchema,
  questionFindSchema,
  questionTopicGetSchema,
  questionUpdateSchema,
} from "./question.schema";

export const questionRoute: Router = Router();

questionRoute.post(
  "/topic/:topicId/question",
  verifyToken,
  verifyAccessPair,
  validate(questionCreateSchema),
  questionCreate,
);
questionRoute.get(
  "/topic/:topicId/question",
  verifyToken,
  verifyAccessPair,
  validate(questionTopicGetSchema),
  questionGet,
);
questionRoute.put(
  "/question/:questionId",
  verifyToken,
  verifyAccessPair,
  validate(questionUpdateSchema),
  questionUpdate,
);
questionRoute.get("/question", validate(questionFindSchema), questionFind);
