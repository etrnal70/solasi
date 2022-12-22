import { TopicGrade, QuestionType } from "@prisma/client";
import { Request, Response } from "express";
import { findQuestion } from "../question/question.service";
import { findTopic } from "../topic/topic.service";
import { findUser } from "../user/user.service";

export async function search(req: Request, res: Response) {
  try {
    const { scope, keyword, grade, type } = req.query;
    if (scope === "user") {
      const users = await findUser(keyword as string);

      return res.status(200).json(users);
    } else if (scope === "topic") {
      const topics = await findTopic(grade as string as TopicGrade, keyword as string);
      return res.status(200).json(topics);
    } else if (scope === "question") {
      const questions = await findQuestion(keyword as string, type as string as QuestionType);

      return res.status(200).json(questions);
    } else if (scope === "") {
      return res.status(400).json({ message: "Missing required scope query param" });
    } else {
      return res.status(400).json({ message: "Unknown scope" });
    }
  } catch (e) {
    if (e instanceof Error) return res.status(500).json({ message: e.message });
  }
}
