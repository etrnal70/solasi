import { QuestionType } from "@prisma/client";
import { z } from "zod";

const choice = z
    .object({
        body: z.string(),
    })
    .array();

const question = z.object({
    body: z.string(),
    image: z.string().url().optional(),
    type: z.nativeEnum(QuestionType),
    choices: choice,
});

export const questionCreateSchema = z.object({
    body: z.object({
        question,
    }),
    params: z.object({
        topicId: z.number(),
    }),
});

export const questionUpdateSchema = z.object({
    body: z.object({
        question,
    }),
    params: z.object({
        questionId: z.number(),
    }),
});

export const questionFindSchema = z.object({
    query: z.object({
        keyword: z.string(),
        type: z.nativeEnum(QuestionType),
    }),
});

export type QuestionInput = z.infer<typeof question>;
