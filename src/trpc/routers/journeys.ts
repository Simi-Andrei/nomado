import { channels, journeys, userChannels, userJourneys } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "../init";
import { createJourneySchema } from "@/types/journey";
import { db } from "@/db";
import z from "zod";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const journeysRouter = createTRPCRouter({
  createJourney: protectedProcedure
    .input(createJourneySchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const [newJourney] = await db
        .insert(journeys)
        .values({
          name: input.name,
          theme: input.theme,
          createdBy: userId,
        })
        .returning();

      await db.insert(userJourneys).values({
        userId,
        journeyId: newJourney.id,
        role: "owner",
      });

      const [generalChannel] = await db
        .insert(channels)
        .values({
          journeyId: newJourney.id,
          name: "general",
          isPrivate: false,
          createdBy: userId,
        })
        .returning();

      await db.insert(userChannels).values({
        userId,
        channelId: generalChannel.id,
      });

      return newJourney;
    }),

  getJourneyById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const [journey] = await db
        .select()
        .from(journeys)
        .where(eq(journeys.id, input.id));

      if (!journey) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Journey not found",
        });
      }

      const [relation] = await db
        .select()
        .from(userJourneys)
        .where(
          and(
            eq(userJourneys.journeyId, input.id),
            eq(userJourneys.userId, userId)
          )
        );

      if (!relation) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this journey",
        });
      }

      return journey;
    }),
});
