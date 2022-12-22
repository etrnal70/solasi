import { QuestionType } from "@prisma/client";
import { z } from "zod";

const choice = z
  .object({
    body: z.string(),
  })
  .array()
  .optional();

const questionBody = z.object({
  body: z.string(),
  image: z.string().url().optional(),
  type: z.nativeEnum(QuestionType),
  choices: choice,
});

export const questionCreateSchema = z.object({
  body: questionBody,
  params: z.object({
    topicId: z.string(),
  }),
});

export const questionUpdateSchema = z.object({
  body: questionBody,
  params: z.object({
    questionId: z.string(),
  }),
});

export const questionTopicGetSchema = z.object({
  params: z.object({
    topicId: z.string(),
  }),
});

export const questionFindSchema = z.object({
  query: z.object({
    keyword: z.string(),
    type: z.nativeEnum(QuestionType),
  }),
});

export type QuestionInput = z.infer<typeof questionBody>;
