import { z } from "zod";

const replyBody = z.object({
  body: z.string(),
  image: z.string().url().optional(),
});

export const replyCreateSchema = z.object({
  body: replyBody,
  params: z.object({
    questionId: z.string(),
  }),
});

export const replyUpdateSchema = z.object({
  body: replyBody,
  params: z.object({
    replyId: z.string(),
  }),
});

export const replyGetSchema = z.object({
  params: z.object({
    questionId: z.string(),
  }),
});

export const replyVoteSchema = z.object({
  params: z.object({
    replyId: z.string(),
  }),
  query: z.object({
    action: z.enum(["apply", "remove"] as const),
  }),
});

export const replyCheckVoteSchema = z.object({
  params: z.object({
    replyId: z.string(),
  }),
});

export type ReplyInput = z.infer<typeof replyBody>;
