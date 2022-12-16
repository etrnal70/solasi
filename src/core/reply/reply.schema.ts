import { z } from "zod";

const reply = z.object({
  body: z.string(),
  image: z.string().url().optional(),
});

export const replyInputSchema = z.object({
  body: z.object({
    reply,
  }),
  params: z.object({
    questionId: z.number(),
  }),
});

export const replyUpdateSchema = z.object({
  body: z.object({
    reply,
  }),
  params: z.object({
    replyId: z.number(),
  }),
});

export type ReplyInput = z.infer<typeof reply>;
