import { QuestionType } from "@prisma/client";
import { dbConn } from "../../utils/db";
import { EssayQuestion, MultipleChoiceQuestion, QuestionInput } from "./question.schema";

export async function createMultipleChoiceQuestion(data: MultipleChoiceQuestion, topicId: number, authorId: number) {
  const question = await dbConn.question.create({
    data: {
      authorId,
      topicId,
      type: data.type,
      body: data.body,
      image: data.image,
      choices: {
        create: data.choices,
      },
    },
  });
  return question;
}

export async function createEssayQuestion(data: EssayQuestion, topicId: number, authorId: number) {
  const question = await dbConn.question.create({
    data: {
      topicId,
      authorId,
      type: data.type,
      body: data.body,
      image: data.image,
    },
  });

  return question;
}

export async function getQuestion(topicId?: number) {
  if (topicId) {
    const questions = await dbConn.question.findMany({
      where: { topicId },
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
      orderBy: { updatedAt: "desc" },
    });

    return questions;
  } else {
    const questions = await dbConn.question.findMany({
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
      orderBy: { updatedAt: "desc" },
    });

    return questions;
  }
}

export async function updateQuestion(data: QuestionInput, questionId: number) {
  const updatedQuestion = await dbConn.question.update({
    where: { id: questionId },
    data: { body: data.body, image: data.image },
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
    },
  });

  return updatedQuestion;
}

export async function findQuestion(keyword: string, type?: QuestionType) {
  if (type) {
    const questions = await dbConn.question.findMany({
      where: { body: { search: keyword }, type },
      select: {
        id: true,
        body: true,
        image: true,
        type: true,
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
      },
    });

    return questions;
  } else {
    const questions = await dbConn.question.findMany({
      where: { body: { search: keyword } },
      select: {
        id: true,
        body: true,
        image: true,
        type: true,
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
      },
    });

    return questions;
  }
}
