import { QuestionType } from "@prisma/client";
import { dbConn } from "../../utils/db";
import { QuestionInput } from "./question.schema";

export async function createQuestion(data: QuestionInput, topicId: number, authorId: number) {
  if (data.type == QuestionType.MULTIPLE_CHOICE) {
    const question = await dbConn.question.create({
      data: {
        authorId,
        topicId,
        type: data.type,
        body: data.body,
        image: data.image,
      },
    });

    // TODO Insert and connect choice
    return question;
  } else {
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
}

export async function getQuestion(topicId: number) {
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
          username: true,
          profileImage: true,
        },
      },
    },
  });

  return questions;
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
          username: true,
          profileImage: true,
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
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            username: true,
            profileImage: true,
          },
        },
      },
    });

    return questions;
  }
  const questions = await dbConn.question.findMany({
    where: { body: { search: keyword } },
    select: {
      id: true,
      body: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          username: true,
          profileImage: true,
        },
      },
    },
  });

  return questions;
}
