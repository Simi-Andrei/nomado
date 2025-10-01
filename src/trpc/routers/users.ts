import { users } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "../init";

export const usersRouter = createTRPCRouter({
  getAll: baseProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.db.select().from(users);
    return allUsers;
  }),
});
