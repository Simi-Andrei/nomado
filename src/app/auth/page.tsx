import { auth } from "@/lib/auth";
import { AuthView } from "../views/auth/auth-view";
import { redirect } from "next/navigation";

type AuthPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

const AuthPage = async ({ searchParams }: AuthPageProps) => {
  const session = await auth();
  const { callbackUrl } = await searchParams;

  if (session?.user) {
    redirect(callbackUrl || "/journeys");
  }

  return <AuthView />;
};
export default AuthPage;
