"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function JourneysView() {
  const trpc = useTRPC();

  const { data: journeys } = useSuspenseQuery(
    trpc.users.getUserJourneys.queryOptions()
  );

  console.log(journeys);

  return <div>JourneysView</div>;
}
