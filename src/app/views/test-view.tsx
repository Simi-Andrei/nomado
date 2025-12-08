"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export function TestView() {
  const trpc = useTRPC();

  const { data: users } = useSuspenseQuery(trpc.users.getAll.queryOptions());

  console.log(users);

  return (
    <div>
      TestView
      <div className="mb-10">
        <h1>Users:</h1>
        {users.map((user) => (
          <p key={user.id}>{user.email}</p>
        ))}
      </div>
      <Button
        onClick={() => signOut({ callbackUrl: "/auth" })}
        type="button"
        className="block"
      >
        Sign out
      </Button>
    </div>
  );
}
