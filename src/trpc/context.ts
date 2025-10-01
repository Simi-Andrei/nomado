import { cache } from "react";
import { auth } from "@/lib/auth";
import { db } from "@/db";

export const createTRPCContext = cache(async () => {
  const session = await auth();
  return {
    session,
    db,
  };
});

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
