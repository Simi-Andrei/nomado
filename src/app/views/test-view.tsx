"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function TestView() {
  const trpc = useTRPC();

  const { data: users } = useSuspenseQuery(trpc.users.getAll.queryOptions());

  console.log(users);

  return <div>TestView</div>;
}
