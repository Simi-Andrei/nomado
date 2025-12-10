import { journeys, userJourneys } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "../init";
import { eq } from "drizzle-orm";

export const usersRouter = createTRPCRouter({
  getUserJourneys: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    return await ctx.db
      .select({
        journeyId: userJourneys.journeyId,
        role: userJourneys.role,
        journeyName: journeys.name,
      })
      .from(userJourneys)
      .leftJoin(journeys, eq(journeys.id, userJourneys.journeyId))
      .where(eq(userJourneys.userId, userId));
  }),
});
