import { QuestionType } from "@prisma/client";
import { z } from "zod";

const choice = z
    .object({
        body: z.string(),
    })
    .array()
    .max(20)
    .optional();

const questionBody = z.object({
    body: z.string(),
    image: z.string().url().optional(),
    type: z.nativeEnum(QuestionType),
    choices: choice,
});

const essayQuestion = z.object({
    body: z.string(),
    image: z.string().url().optional(),
    type: z.nativeEnum(QuestionType),
});

const multipleChoiceQuestion = z.object({
    body: z.string(),
    image: z.string().url().optional(),
    type: z.nativeEnum(QuestionType),
    choices: z
        .object({
            body: z.string(),
            questionId: z.number(),
        })
        .array(),
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

// export const questionFindSchema = z.object({
//   query: z.object({
//     keyword: z.string(),
//     type: z.nativeEnum(QuestionType),
//   }),
// });

export type QuestionInput = z.infer<typeof questionBody>;
export type EssayQuestion = z.infer<typeof essayQuestion>;
export type MultipleChoiceQuestion = z.infer<typeof multipleChoiceQuestion>;
