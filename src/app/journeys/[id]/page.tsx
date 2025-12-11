import { JourneyView } from "@/app/views/journeys/journey-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const JourneyPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.journeys.getJourneyById.queryOptions({ id })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <JourneyView id={id} />
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default JourneyPage;
