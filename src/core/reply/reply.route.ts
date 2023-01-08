import { Router } from "express";
import { verifyAccessPair, verifyToken } from "../../utils/auth/auth.helper";
import { validate } from "../../utils/validate/validate.helper";
import {
  replyCheckDownvote,
  replyCheckUpvote,
  replyCreate,
  replyDownvote,
  replyGet,
  replyUpdate,
  replyUpvote,
} from "./reply.controller";
import {
  replyCheckVoteSchema,
  replyCreateSchema,
  replyGetSchema,
  replyUpdateSchema,
  replyVoteSchema,
} from "./reply.schema";

export const replyRoute: Router = Router();

replyRoute.post("/question/:questionId/reply", verifyToken, verifyAccessPair, validate(replyCreateSchema), replyCreate);
replyRoute.put("/reply/:replyId", verifyToken, verifyAccessPair, validate(replyUpdateSchema), replyUpdate);
replyRoute.get("/question/:questionId/reply", validate(replyGetSchema), replyGet);
replyRoute.post("/reply/:replyId/upvote", verifyToken, verifyAccessPair, validate(replyVoteSchema), replyUpvote);
replyRoute.get(
  "/reply/:replyId/upvote",
  verifyToken,
  verifyAccessPair,
  validate(replyCheckVoteSchema),
  replyCheckUpvote,
);
replyRoute.post("/reply/:replyId/downvote", verifyToken, verifyAccessPair, validate(replyVoteSchema), replyDownvote);
replyRoute.get(
  "/reply/:replyId/downvote",
  verifyToken,
  verifyAccessPair,
  validate(replyCheckVoteSchema),
  replyCheckDownvote,
);
