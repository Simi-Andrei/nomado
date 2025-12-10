"use client";

import { SignInCard } from "@/components/auth/sign-in-card";
import { SignUpCard } from "@/components/auth/sign-up-card";
import { useState } from "react";

type AuthState = "signIn" | "signUp";

export function AuthView() {
  const [authState, setAuthState] = useState<AuthState>("signIn");

  return (
    <div className="h-screen flex flex-col gap-y-2 items-center justify-center p-4">
      {authState === "signIn" ? (
        <SignInCard setAuthState={setAuthState} />
      ) : (
        <SignUpCard setAuthState={setAuthState} />
      )}
      <p className="text-xs text-muted-foreground text-center">
        By clicking continue, you agree with our{" "}
        <span className="cursor-pointer font-semibold hover:text-neutral-800 duration-200">
          Terms & Conditions
        </span>{" "}
        and{" "}
        <span className="cursor-pointer font-semibold hover:text-neutral-800 duration-200">
          Privacy Policy
        </span>
      </p>
    </div>
  );
}
