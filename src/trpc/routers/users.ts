import { users } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "../init";

export const usersRouter = createTRPCRouter({
  getAll: baseProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        emailVerified: users.emailVerified,
        image: users.image,
      })
      .from(users);
    return allUsers;
  }),
});
