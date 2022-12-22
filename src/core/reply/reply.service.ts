import { dbConn } from "../../utils/db";
import { ReplyInput } from "./reply.schema";

export async function createReply(data: ReplyInput, questionId: number, authorId: number) {
  const reply = await dbConn.reply.create({
    data: {
      ...data,
      authorId,
      questionId,
    },
  });

  return reply;
}

export async function updateReply(data: ReplyInput, replyId: number) {
  const updatedReply = await dbConn.reply.update({
    where: { id: replyId },
    data,
  });

  return updatedReply;
}

export async function getQuestionReplies(questionId: number) {
  // TODO Get up/downvote number on each replies
  // TODO Which data should be included ?
  const replies = await dbConn.reply.findMany({
    where: { questionId },
    include: {
      _count: { select: { upvotes: true, downvotes: true } },
      author: { select: { id: true, username: true, profileImage: true } },
    },
  });

  return replies;
}

export async function getUserReplies(userId: number) {
  // TODO Get up/downvote number on each replies
  // TODO Which data should be included ?
  const replies = await dbConn.reply.findMany({
    where: { authorId: userId },
    include: {
      _count: { select: { upvotes: true, downvotes: true } },
    },
  });

  return replies;
}

export async function upvoteReply(replyId: number, giverId: number) {
  const reply = await dbConn.reply.findFirst({ where: { id: replyId } });
  if (reply) {
    // Delete any downvoted relation
    try {
      await dbConn.downvote.delete({
        where: { userId_givenById_replyId: { userId: reply.authorId, givenById: giverId, replyId: reply.id } },
      });
    } catch (e) {}

    const upvotedReply = await dbConn.upvote.create({
      data: {
        userId: reply.authorId,
        givenById: giverId,
        replyId: reply.id,
      },
    });

    return upvotedReply;
  }

  return reply;
}

export async function downvoteReply(replyId: number, giverId: number) {
  const reply = await dbConn.reply.findFirst({ where: { id: replyId } });
  if (reply) {
    // Delete any upvoted relation
    try {
      await dbConn.upvote.delete({
        where: { userId_givenById_replyId: { userId: reply.authorId, givenById: giverId, replyId: reply.id } },
      });
    } catch (e) {}

    const downvotedReply = await dbConn.downvote.create({
      data: {
        userId: reply.authorId,
        givenById: giverId,
        replyId: reply.id,
      },
    });

    return downvotedReply;
  }

  return reply;
}
