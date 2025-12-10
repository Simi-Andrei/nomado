import type { Metadata } from "next";
import { Georama } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";

const georama = Georama({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nomado",
  description:
    "Capture your journeys, share travel stories, plan trips, and keep your travel memories in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${georama.className}  antialiased`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
