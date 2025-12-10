import { createTRPCRouter } from "../init";
import { journeysRouter } from "./journeys";
import { usersRouter } from "./users";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  journeys: journeysRouter,
});

export type AppRouter = typeof appRouter;
