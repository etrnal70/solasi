import { QuestionType, TopicGrade } from "@prisma/client";
import { z } from "zod";

const scopeVals = ["user", "topic", "question"] as const;
export const searchSchema = z.object({
  query: z.object({
    scope: z.enum(scopeVals),
    keyword: z.string(),
    grade: z.nativeEnum(TopicGrade).optional(),
    type: z.nativeEnum(QuestionType).optional(),
    topicId: z.string(),
  }),
});
