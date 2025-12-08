import { auth } from "@/lib/auth";
import { AuthView } from "../views/auth-view";
import { redirect } from "next/navigation";

const AuthPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/journeys");
  }

  return <AuthView />;
};
export default AuthPage;
