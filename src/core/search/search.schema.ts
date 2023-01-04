import { QuestionType, TopicGrade } from "@prisma/client";
import { z } from "zod";

export const searchSchema = z.object({
  query: z.object({
    scope: z.string(),
    keyword: z.string(),
    grade: z.nativeEnum(TopicGrade).optional(),
    type: z.nativeEnum(QuestionType).optional(),
    topicId: z.string(),
  }),
});
