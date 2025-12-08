import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { TestView } from "../views/test-view";

const JourneysPage = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.users.getAll.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <TestView />
      </Suspense>
    </HydrationBoundary>
  );
};

export default JourneysPage;
