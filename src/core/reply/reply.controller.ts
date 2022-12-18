import { Request, Response } from "express";
import {
    createReply,
    downvoteReply,
    getQuestionReplies,
    getUserReplies,
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
        return res.status(500).json({ message: e });
    }
}

export async function replyUpdate(req: Request, res: Response) {
    try {
        const data = req.body;
        const { replyId } = req.params;
        const updatedReply = await updateReply(data, parseInt(replyId, 10));

        return res.status(200).json(updatedReply);
    } catch (e) {
        return res.status(500).json({ message: e });
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
        return res.status(500).json({ message: e });
    }
}

export async function replyUpvote(req: Request, res: Response) {
    try {
        const { replyId } = req.params;
        const userId = req.user.id;
        const upvote = await upvoteReply(parseInt(replyId, 10), userId);

        return res.status(201).json({ message: `Success upvoting on reply with id ${upvote?.replyId}` });
    } catch (e) {
        return res.status(500).json({ message: e });
    }
}

export async function replyDownvote(req: Request, res: Response) {
    try {
        const { replyId } = req.params;
        const userId = req.user.id;
        const upvote = await downvoteReply(parseInt(replyId, 10), userId);

        return res.status(201).json({ message: `Success downvoting on reply with id ${upvote?.replyId}` });
    } catch (e) {
        return res.status(500).json({ message: e });
    }
}