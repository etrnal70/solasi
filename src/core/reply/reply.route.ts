import { Router } from "express";
import { verifyAccessToken } from "../../utils/auth/auth.helper";
import { validate } from "../../utils/validate/validate.helper";
import { replyCreate, replyDownvote, replyGet, replyUpdate, replyUpvote } from "./reply.controller";
import { replyCreateSchema, replyGetSchema, replyUpdateSchema, replyVoteSchema } from "./reply.schema";

export const replyRoute: Router = Router();

replyRoute.post("/question/:questionId/reply", verifyAccessToken, validate(replyCreateSchema), replyCreate);
replyRoute.put("/reply/:replyId", verifyAccessToken, validate(replyUpdateSchema), replyUpdate);
replyRoute.get("/question/:questionId/reply", validate(replyGetSchema), replyGet);
replyRoute.post("/reply/:replyId/upvote", verifyAccessToken, validate(replyVoteSchema), replyUpvote);
replyRoute.post("/reply/:replyId/downvote", verifyAccessToken, validate(replyVoteSchema), replyDownvote);
