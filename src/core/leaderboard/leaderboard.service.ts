import { dbConn } from "../../utils/db";

export async function getLeaderboard(order: "asc" | "desc", limit?: number) {
  if (limit) {
    const stats = await dbConn.user.findMany({
      select: {
        username: true,
        scores: true,
        _count: {
          select: { replies: true, acceptedUpvotes: true },
        },
      },
      orderBy: {
        scores: order,
      },
      take: limit,
    });

    return stats;
  } else {
    const stats = await dbConn.user.findMany({
      select: {
        username: true,
        scores: true,
        _count: {
          select: { replies: true, acceptedUpvotes: true },
        },
      },
      orderBy: {
        scores: order,
      },
    });

    return stats;
  }
}
