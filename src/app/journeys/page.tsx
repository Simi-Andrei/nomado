import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { JourneysView } from "../views/journeys/journeys-view";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const JourneyPage = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.users.getUserJourneys.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading</p>}>
        <ErrorBoundary fallback={<p>Error</p>}>
          <JourneysView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default JourneyPage;
