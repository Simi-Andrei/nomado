import z from "zod";

export const createJourneySchema = z.object({
  name: z
    .string()
    .min(3, { error: "Journey name must be at least 3 characters long" })
    .max(32, { error: "Journey name must be at most 32 characters long" }),
  theme: z.string().min(1, { error: "Please select a color" }),
});

export type CreateJourneyInput = z.infer<typeof createJourneySchema>;
