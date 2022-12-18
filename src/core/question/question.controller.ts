import { QuestionType } from "@prisma/client";
import { Request, Response } from "express";
import { createQuestion, findQuestion, updateQuestion } from "./question.service";

export async function questionCreate(req: Request, res: Response) {
    try {
        const data = req.body;
        const { topicId } = req.params;
        const userId = req.user.id;
        const question = await createQuestion(data, parseInt(topicId, 10), userId);

        return res.status(201).json({ message: `Success creating question with id ${question.id}` });
    } catch (e) {
        return res.status(500).json({ message: e });
    }
}

export async function questionUpdate(req: Request, res: Response) {
    try {
        const data = req.body;
        const { questionId } = req.params;
        const updatedQuestion = await updateQuestion(data, parseInt(questionId, 10));

        return res.status(200).json(updatedQuestion);
    } catch (e) {
        return res.status(500).send({ message: e });
    }
}

export async function questionFind(req: Request, res: Response) {
    try {
        const { keyword, type } = req.query;
        const questions = await findQuestion(keyword as string, type as string as QuestionType);

        return res.status(200).json(questions);
    } catch (e) {
        return res.status(500).json({ messag: e });
    }
}
