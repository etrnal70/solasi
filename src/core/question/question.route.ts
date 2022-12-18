import { Router } from "express";
import { verifyAccessToken } from "../../utils/auth/auth.helper";
import { validate } from "../../utils/validate/validate.helper";
import { questionCreate, questionFind, questionUpdate } from "./question.controller";
import { questionCreateSchema, questionFindSchema, questionUpdateSchema } from "./question.schema";

export const questionRoute: Router = Router();

questionRoute.post("/topic/:topicId/question", verifyAccessToken, validate(questionCreateSchema), questionCreate);
questionRoute.put("/question/:questionId", verifyAccessToken, validate(questionUpdateSchema), questionUpdate);
questionRoute.get("/question", validate(questionFindSchema), questionFind);
