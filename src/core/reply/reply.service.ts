import { Prisma } from "@prisma/client";
import { dbConn } from "../../utils/db";
import { ReplyInput } from "./reply.schema";

export async function createReply(data: ReplyInput, questionId: number, authorId: number) {
    const replyTx = await dbConn.$transaction([
        dbConn.reply.create({
            data: {
                ...data,
                authorId,
                questionId,
            },
        }),
        dbConn.user.update({
            where: { id: authorId },
            data: { scores: { increment: 1 } }, // Scores for replying,
        }),
    ]);

    return replyTx[0];
}

export async function updateReply(data: ReplyInput, replyId: number) {
    const updatedReply = await dbConn.reply.update({
        where: { id: replyId },
        data,
    });

    return updatedReply;
}

export async function getQuestionReplies(questionId: number) {
    const replies = await dbConn.reply.findMany({
        where: { questionId },
        include: {
            _count: { select: { upvotes: true, downvotes: true } },
            author: {
                select: { id: true, username: true, profileImage: true, scores: true, _count: { select: { replies: true } } },
            },
        },
    });
    const question = await dbConn.question.findUnique({
        where: { id: questionId },
        select: {
            id: true,
            body: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            author: {
                select: {
                    id: true,
                    username: true,
                    profileImage: true,
                    scores: true,
                },
            },
            topic: { select: { id: true, name: true, profileImage: true, grade: true } },
            type: true,
            choices: { select: { body: true, createdAt: true, updatedAt: true } },
        },
    });

    return {
        question,
        replies,
    };
}

export async function getUserReplies(userId: number) {
    const replies = await dbConn.reply.findMany({
        where: { authorId: userId },
        include: {
            _count: { select: { upvotes: true, downvotes: true } },
        },
    });

    return replies;
}

export async function upvoteReply(replyId: number, giverId: number) {
    const tx = await dbConn.$transaction(async (tx) => {
        const reply = await tx.reply.findFirst({ where: { id: replyId } });
        if (reply == null) {
            return new Error(`error: reply with id ${replyId} not exist`);
        }
        // Delete any downvoted relation
        try {
            await undoDownvoteReply(replyId, giverId);
        } catch (e) { }

        const upvoteRelation = await tx.upvote.create({
            data: {
                userId: reply.authorId,
                givenById: giverId,
                replyId: reply.id,
            },
        });

        if (upvoteRelation instanceof Prisma.PrismaClientKnownRequestError && upvoteRelation.code === "P2002") {
            return new Error("error: user already upvoted");
        }

        await tx.user.update({
            where: { id: reply.authorId },
            data: { scores: { increment: 2 } },
        });

        return upvoteRelation;
    });

    return tx;
}

export async function undoUpvoteReply(replyId: number, giverId: number) {
    const tx = dbConn.$transaction(async (tx) => {
        // Check if reply exist
        const reply = await tx.reply.findFirst({ where: { id: replyId } });
        if (reply == null) {
            return new Error(`error: reply with id ${replyId} not exist`);
        }

        // Check if relation exist
        const relationExist = await tx.upvote.findUnique({
            where: {
                userId_givenById_replyId: {
                    userId: reply.authorId,
                    givenById: giverId,
                    replyId: reply.id,
                },
            },
        });

        if (relationExist == null) {
            return new Error(`error: relation between reply and given upvote not found`);
        }

        await tx.user.update({
            where: { id: reply.authorId },
            data: { scores: { decrement: 2 } },
        });

        return await tx.upvote.delete({
            where: {
                userId_givenById_replyId: {
                    userId: reply.authorId,
                    givenById: giverId,
                    replyId: reply.id,
                },
            },
        });
    });

    return tx;
}

export async function downvoteReply(replyId: number, giverId: number) {
    const tx = dbConn.$transaction(async (tx) => {
        // Check if reply exist
        const reply = await tx.reply.findFirst({ where: { id: replyId } });
        if (reply == null) {
            return new Error(`error: reply with id ${replyId} not exist`);
        }

        // Delete any upvoted relation
        try {
            await undoUpvoteReply(replyId, giverId);
        } catch (e) { }

        const downvoteRelation = await tx.downvote.create({
            data: {
                userId: reply.authorId,
                givenById: giverId,
                replyId: reply.id,
            },
        });

        if (downvoteRelation instanceof Prisma.PrismaClientKnownRequestError && downvoteRelation.code === "P2002") {
            return new Error("error: user already downvoted");
        }

        await dbConn.user.update({
            where: { id: reply.authorId },
            data: { scores: { decrement: 3 } },
        });

        return downvoteRelation;
    });

    return tx;
}

export async function undoDownvoteReply(replyId: number, giverId: number) {
    const tx = dbConn.$transaction(async (tx) => {
        // Check if reply exist
        const reply = await tx.reply.findFirst({ where: { id: replyId } });
        if (reply == null) {
            return new Error(`error: reply with id ${replyId} not exist`);
        }

        // Check if relation exist
        const relationExist = await tx.downvote.findUnique({
            where: {
                userId_givenById_replyId: {
                    userId: reply.authorId,
                    givenById: giverId,
                    replyId: reply.id,
                },
            },
        });

        if (relationExist == null) {
            return new Error(`error: relation between reply and given downvote not found`);
        }

        await tx.user.update({
            where: { id: reply.authorId },
            data: { scores: { increment: 3 } },
        });

        return await tx.downvote.delete({
            where: {
                userId_givenById_replyId: {
                    userId: reply.authorId,
                    givenById: giverId,
                    replyId: reply.id,
                },
            },
        });
    });

    return tx;
}
