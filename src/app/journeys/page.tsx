import { trpcCaller } from "@/trpc/server";
import { redirect } from "next/navigation";

const JourneyPage = async () => {
  const caller = await trpcCaller();
  const journeys = await caller.users.getUserJourneys();

  if (journeys.length === 0) {
    redirect("/journeys/create");
  }

  redirect(`/journeys/${journeys[0].journeyId}`);
};

export default JourneyPage;
