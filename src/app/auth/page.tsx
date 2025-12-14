import { auth } from "@/lib/auth";
import { AuthView } from "../views/auth/auth-view";
import { redirect } from "next/navigation";

type AuthPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

const AuthPage = async ({ searchParams }: AuthPageProps) => {
  const session = await auth();

  if (session) {
    redirect("/journeys");
  }

  return <AuthView />;
};
export default AuthPage;
