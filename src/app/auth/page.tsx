import { auth } from "@/lib/auth";
import { AuthView } from "../views/auth/auth-view";
import { redirect } from "next/navigation";

type AuthPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

const AuthPage = async ({ searchParams }: AuthPageProps) => {
  return <AuthView />;
};
export default AuthPage;
