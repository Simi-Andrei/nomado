import { AppRouter } from "@/trpc/routers/_app";
import { inferProcedureOutput } from "@trpc/server";

export type Journey = inferProcedureOutput<
  AppRouter["journeys"]["getJourneyById"]
>;
