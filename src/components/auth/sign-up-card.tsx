import { Dispatch, SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { GoogleIcon } from "../icons/google-icon";
import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormField,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { SignUpInput, signUpSchema } from "@/types/auth";
import { Eye, EyeOff, TriangleAlert, UserRoundPlus } from "lucide-react";
import { signIn } from "next-auth/react";
import { GithubIcon } from "../icons/github-icon";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

type AuthState = "signIn" | "signUp";

export function SignUpCard({
  setAuthState,
}: {
  setAuthState: Dispatch<SetStateAction<AuthState>>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUpHandler = async (data: SignUpInput) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error);
        setLoading(false);
        return;
      }

      signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/journeys",
      });

      setLoading(false);
    } catch (error) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <Image
          src="/images/logo.png"
          alt="Nomado"
          width={56}
          height={56}
          className="mx-auto w-14 h-14"
          loading="eager"
          fetchPriority="high"
        />
        <CardTitle>Nice to meet you!</CardTitle>
        <CardDescription>
          Let&apos;s start the journey of your dreams
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(signUpHandler)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      maxLength={32}
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput
                        disabled={loading}
                        type={showPassword ? "text" : "password"}
                        maxLength={32}
                        placeholder="••••••••"
                        {...field}
                      />
                      <InputGroupAddon
                        className="cursor-pointer"
                        align="inline-end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput
                        disabled={loading}
                        type={showConfirmPassword ? "text" : "password"}
                        maxLength={32}
                        placeholder="••••••••"
                        {...field}
                      />
                      <InputGroupAddon
                        className="cursor-pointer"
                        align="inline-end"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <Eye /> : <EyeOff />}
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <p className="text-destructive text-[13px] flex items-center justify-center gap-x-1">
                <TriangleAlert className="size-3.5 stroke-destructive mb-0.5 stroke-2" />
                {error}
              </p>
            )}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Spinner />
                  Signing up
                </>
              ) : (
                <>
                  <UserRoundPlus className="stroke-primary-foreground" />
                  Sign up
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="after:border-border relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-4">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <div className="flex flex-col gap-y-4">
          <Button
            disabled={loading}
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/journeys" })}
            variant="outline"
            className="w-full"
          >
            <GoogleIcon />
            Google
          </Button>
          <Button
            disabled={loading}
            type="button"
            onClick={() => signIn("github", { callbackUrl: "/journeys" })}
            variant="outline"
            className="w-full"
          >
            <GithubIcon />
            Github
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-y-2">
        <p
          className={cn(
            "text-teal-800 text-[13px] font-semibold cursor-pointer hover:underline underline-offset-2 w-full text-center",
            loading && "pointer-events-none opacity-50"
          )}
        >
          Forgot password?
        </p>
        <p className="text-muted-foreground text-[13px] w-full text-center">
          Already have an account?{" "}
          <span
            className={cn(
              "hover:underline underline-offset-2 cursor-pointer font-semibold text-teal-800",
              loading && "pointer-events-none opacity-50"
            )}
            onClick={() => setAuthState("signIn")}
          >
            Sign in here
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
