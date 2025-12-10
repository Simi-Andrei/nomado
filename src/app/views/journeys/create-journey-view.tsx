"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useTRPC } from "@/trpc/client";
import { CreateJourneyInput, createJourneySchema } from "@/types/journey";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LogOut, TentTree } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function CreateJourneyView() {
  const trpc = useTRPC();
  const router = useRouter();

  const createJourneyMutation = useMutation(
    trpc.journeys.createJourney.mutationOptions()
  );

  const form = useForm<CreateJourneyInput>({
    resolver: zodResolver(createJourneySchema),
    defaultValues: {
      name: "",
      theme: "teal",
    },
  });

  const createJourneyHandler = async (data: CreateJourneyInput) => {
    try {
      const newJourney = await createJourneyMutation.mutateAsync(data);
      router.replace(`/journeys/${newJourney.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid place-items-center w-screen h-screen p-4 md:p-0">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create a journey</CardTitle>
          <CardDescription>
            Please enter the journey name and pick a theme!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(createJourneyHandler)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My favorite journey" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <TooltipProvider>
                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel>Theme</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex items-center justify-start gap-4 mt-2"
                        >
                          {[
                            {
                              value: "teal",
                              bg: "bg-teal-800",
                              border: "border-teal-800",
                            },
                            {
                              value: "red",
                              bg: "bg-red-800",
                              border: "border-red-800",
                            },
                            {
                              value: "amber",
                              bg: "bg-amber-800",
                              border: "border-amber-800",
                            },
                            {
                              value: "green",
                              bg: "bg-green-800",
                              border: "border-green-800",
                            },
                            {
                              value: "sky",
                              bg: "bg-sky-800",
                              border: "border-sky-800",
                            },
                            {
                              value: "indigo",
                              bg: "bg-indigo-800",
                              border: "border-indigo-800",
                            },
                            {
                              value: "fuchsia",
                              bg: "bg-fuchsia-800",
                              border: "border-fuchsia-800",
                            },
                            {
                              value: "rose",
                              bg: "bg-rose-800",
                              border: "border-rose-800",
                            },
                          ].map((c) => {
                            const selected = field.value === c.value;

                            return (
                              <FormItem key={c.value} className="relative">
                                <RadioGroupItem
                                  value={c.value}
                                  className="peer sr-only"
                                />

                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div
                                      onClick={() => field.onChange(c.value)}
                                      className={`h-7 w-7 rounded-full cursor-pointer flex items-center justify-center transition-all ${
                                        c.bg
                                      } ${
                                        selected ? "scale-105" : "scale-100"
                                      }`}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent side="top">
                                    <p className="capitalize">{c.value}</p>
                                  </TooltipContent>
                                </Tooltip>
                                {selected && (
                                  <div
                                    className={`absolute -inset-1 rounded-full pointer-events-none border-2 ${c.border}`}
                                  />
                                )}
                              </FormItem>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TooltipProvider>
              <div className="mt-6 flex items-center justify-between gap-x-2">
                <Button
                  onClick={() => signOut({ callbackUrl: "/auth" })}
                  type="button"
                  variant="outline"
                  className="flex-1"
                >
                  <LogOut />
                  Logout instead
                </Button>
                <Button type="submit" className="flex-1">
                  <TentTree />
                  Create journey
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
