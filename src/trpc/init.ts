import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TRPCContext } from "./context";

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(
  t.middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session?.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not authenticated",
      });
    }
    return next({
      ctx: {
        session: ctx.session,
        db: ctx.db,
      },
    });
  })
);
