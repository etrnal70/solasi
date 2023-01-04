import { QuestionType } from "@prisma/client";
import { Request, Response } from "express";
import { EssayQuestion, MultipleChoiceQuestion } from "./question.schema";
import {
  createMultipleChoiceQuestion,
  createEssayQuestion,
  getQuestion,
  updateQuestion,
  findQuestion,
} from "./question.service";

export async function questionCreate(req: Request, res: Response) {
  try {
    const data = req.body;
    const { topicId } = req.params;
    const userId = req.user.id;
    if (data.type == QuestionType.MULTIPLE_CHOICE) {
      const question = await createMultipleChoiceQuestion(
        data as MultipleChoiceQuestion,
        parseInt(topicId, 10),
        userId,
      );

      return res.status(201).json({ message: `Success creating question with id ${question.id}` });
    } else if (data.type == QuestionType.ESSAY) {
      const question = await createEssayQuestion(data as EssayQuestion, parseInt(topicId, 10), userId);

      return res.status(201).json({ message: `Success creating question with id ${question.id}` });
    }
  } catch (e) {
    if (e instanceof Error) return res.status(500).json({ message: e.message });
  }
}

export async function questionGet(req: Request, res: Response) {
  try {
    const { topicId } = req.params;
    if (topicId == "") {
      const questions = await getQuestion();
      return res.status(200).json(questions);
    } else {
      const questions = await getQuestion(parseInt(topicId, 10));
      return res.status(200).json(questions);
    }
  } catch (e) {
    if (e instanceof Error) return res.status(500).json({ message: e.message });
  }
}

export async function questionUpdate(req: Request, res: Response) {
  try {
    const data = req.body;
    const { questionId } = req.params;
    const updatedQuestion = await updateQuestion(data, parseInt(questionId, 10));

    return res.status(200).json(updatedQuestion);
  } catch (e) {
    if (e instanceof Error) return res.status(500).send({ message: e.message });
  }
}

export async function questionFind(req: Request, res: Response) {
  try {
    const { keyword, type } = req.query;
    const questions = await findQuestion(keyword as string, type as string as QuestionType);

    return res.status(200).json(questions);
  } catch (e) {
    if (e instanceof Error) return res.status(500).json({ message: e.message });
  }
}
