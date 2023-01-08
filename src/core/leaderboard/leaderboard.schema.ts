import { z } from "zod";

export const leaderboardSchema = z.object({
  query: z.object({
    order: z.enum(["asc", "desc"] as const),
    limit: z.string().optional(),
  }),
});
