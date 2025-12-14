import { trpcCaller } from "@/trpc/server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

const JourneyPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/auth");
  }

  const caller = await trpcCaller();
  const journeys = await caller.users.getUserJourneys();

  if (journeys.length === 0) {
    redirect("/journeys/create");
  }

  redirect(`/journeys/${journeys[0].journeyId}`);
};

export default JourneyPage;
