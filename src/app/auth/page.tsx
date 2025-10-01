"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

const Authpage = () => {
  const signInHandler = () => {
    signIn("google", { callbackUrl: "/test" });
  };

  return (
    <div>
      <h1>Login</h1>
      <Button type="button" onClick={signInHandler}>
        Continue with Google
      </Button>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
};
export default Authpage;
