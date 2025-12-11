import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { JourneysView } from "../views/journeys/journeys-view";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { FullPageSpinner } from "@/components/utils/full-page-spinner";

export const dynamic = "force-dynamic";

const JourneyPage = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.users.getUserJourneys.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <Suspense fallback={<FullPageSpinner />}>
          <JourneysView />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default JourneyPage;
