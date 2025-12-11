import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { JourneysView } from "../views/journeys/journeys-view";
import { ErrorBoundary } from "react-error-boundary";

const JourneyPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(trpc.users.getUserJourneys.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <JourneysView />
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default JourneyPage;
