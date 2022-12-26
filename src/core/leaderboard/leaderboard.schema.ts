import { z } from "zod";

export const leaderboardSchema = z.object({
    query: z.object({
        order: z.string(),
        limit: z.string(),
    }),
});
