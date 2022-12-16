import { QuestionType } from "@prisma/client";
import { dbConn } from "../../utils/db";
import { QuestionInput } from "./question.schema";

export async function createQuestion(data: QuestionInput, topicId: number, authorId: number) {
    // TODO Handle based on question type
    if (data.type == "MULTIPLE_CHOICE") {
        const question = await dbConn.question.create({
            data: {
                authorId,
                topicId,
                type: data.type,
                body: data.body,
                image: data.image,
                choices: {
                    createMany: {
                        data: data.choices,
                        skipDuplicates: true,
                    },
                },
            },
        });
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

export async function updateQuestion(data: QuestionInput, questionId: number) {
    const updatedQuestion = await dbConn.question.update({
        where: { id: questionId },
        data: { body: data.body },
    });

    return updatedQuestion;
}

export async function findQuestion(keyword: string, type?: QuestionType) {
    if (type) {
        const questions = await dbConn.question.findMany({
            where: { body: { search: keyword }, type },
        });

        return questions;
    }
    const questions = await dbConn.question.findMany({
        where: { body: { search: keyword } },
    });

    return questions;
}
