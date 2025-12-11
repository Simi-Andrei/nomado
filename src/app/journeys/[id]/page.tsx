import { JourneyView } from "@/app/views/journeys/journey-view";
import { FullPageSpinner } from "@/components/utils/full-page-spinner";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const JourneyPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.journeys.getJourneyById.queryOptions({ id })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<FullPageSpinner />}>
        <ErrorBoundary fallback={<p>Error</p>}>
          <JourneyView id={id} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default JourneyPage;
