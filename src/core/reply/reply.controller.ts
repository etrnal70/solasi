import { Request, Response } from "express";
import {
  createReply,
  downvoteReply,
  getQuestionReplies,
  getUserReplies,
  undoDownvoteReply,
  undoUpvoteReply,
  updateReply,
  upvoteReply,
} from "./reply.service";

export async function replyCreate(req: Request, res: Response) {
  try {
    const data = req.body;
    const { questionId } = req.params;
    const userId = req.user.id;
    const reply = await createReply(data, parseInt(questionId, 10), userId);

    return res.status(201).json(reply);
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}

export async function replyUpdate(req: Request, res: Response) {
  try {
    const data = req.body;
    const { replyId } = req.params;
    const updatedReply = await updateReply(data, parseInt(replyId, 10));

    return res.status(200).json(updatedReply);
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}

export async function replyGet(req: Request, res: Response) {
  try {
    const { questionId, userId } = req.params;
    if (questionId !== "") {
      const replies = await getQuestionReplies(parseInt(questionId, 10));

      return res.status(200).json(replies);
    } else {
      const replies = await getUserReplies(parseInt(userId, 10));

      return res.status(200).json(replies);
    }
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}

export async function replyUpvote(req: Request, res: Response) {
  try {
    const { replyId } = req.params;
    const { action } = req.query;
    const userId = req.user.id;
    if (action == "apply") {
      const upvote = await upvoteReply(parseInt(replyId, 10), userId);
      if (upvote instanceof Error) {
        throw upvote;
      }

      return res.status(200).json({ message: `Success upvoting on reply with id ${upvote?.replyId}` });
    } else if (action == "remove") {
      const undoUpvote = await undoUpvoteReply(parseInt(replyId, 10), userId);
      if (undoUpvote instanceof Error) {
        throw undoUpvote;
      }

      return res.status(200).json({ message: `Success undoing upvote on reply with id ${undoUpvote?.replyId}` });
    }
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}

export async function replyDownvote(req: Request, res: Response) {
  try {
    const { replyId } = req.params;
    const { action } = req.query;
    const userId = req.user.id;
    if (action == "apply") {
      const downvote = await downvoteReply(parseInt(replyId, 10), userId);
      if (downvote instanceof Error) {
        throw downvote;
      }

      return res.status(200).json({ message: `Success downvoting on reply with id ${downvote?.replyId}` });
    } else if (action == "remove") {
      const undoDownvote = await undoDownvoteReply(parseInt(replyId, 10), userId);
      if (undoDownvote instanceof Error) {
        throw undoDownvote;
      }

      return res.status(200).json({ message: `Success downvoting on reply with id ${undoDownvote?.replyId}` });
    }
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}
