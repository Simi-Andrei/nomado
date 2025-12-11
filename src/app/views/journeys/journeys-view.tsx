"use client";

import { FullPageSpinner } from "@/components/utils/full-page-spinner";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function JourneysView() {
  const router = useRouter();

  const trpc = useTRPC();

  const { data: journeys } = useSuspenseQuery(
    trpc.users.getUserJourneys.queryOptions()
  );

  useEffect(() => {
    if (!journeys) return;

    if (journeys.length === 0) {
      router.replace("/journeys/create");
    } else {
      router.replace(`/journeys/${journeys[0].journeyId}`);
    }
  }, [journeys, router]);

  return <FullPageSpinner />;
}
