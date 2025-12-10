"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export function JourneyView({ id }: { id: string }) {
  const trpc = useTRPC();

  const { data: journey } = useSuspenseQuery(
    trpc.journeys.getJourneyById.queryOptions({ id })
  );

  return (
    <div>
      <h1 className="mb-4">Journey view</h1>
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
