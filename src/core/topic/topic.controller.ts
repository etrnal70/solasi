import { TopicGrade } from "@prisma/client";
import { Request, Response } from "express";
import { createTopic, findTopic, getTopics } from "./topic.service";

export async function topicCreate(req: Request, res: Response) {
  try {
    const data = req.body;
    const topic = await createTopic(data);

    return res.status(200).json({ message: `Success creating '${topic.name}' topic` });
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}

export async function topicGet(_req: Request, res: Response) {
  try {
    const topics = await getTopics();

    return res.status(200).json(topics);
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}

export async function topicFind(req: Request, res: Response) {
  try {
    const { keyword, grade } = req.query;
    // TODO map gradeString to object type
    const topics = await findTopic(grade as string as TopicGrade, keyword as string);

    return res.status(200).json(topics);
  } catch (e) {
    return res.status(500).json({ message: (e as Error).message });
  }
}
