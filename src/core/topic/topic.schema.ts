import { TopicGrade } from "@prisma/client";
import { z } from "zod";

const topic = z.object({
    name: z.string(),
    profileImage: z.string().url().optional(),
    grade: z.nativeEnum(TopicGrade),
});

export const topicInputSchema = z.object({
    body: z.object({
        topic,
    }),
});

export const topicFindSchemam = z.object({
    query: z.object({
        keyword: z.string(),
        grade: z.nativeEnum(TopicGrade),
    }),
});

export type TopicInput = z.infer<typeof topic>;
