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

const questionInputSchema = z.object({
    body: z.object({
        question,
    }),
    params: z.object({
        topicId: z.number(),
    }),
});

export type QuestionInput = z.infer<typeof question>;
