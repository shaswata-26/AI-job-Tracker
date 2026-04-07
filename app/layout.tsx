import "./globals.css";
import type { Metadata } from "next";
import AppProviders from "@/providers/app-providers";

export const metadata: Metadata = {
  title: "AI Job Tracker",
  description: "Track job applications with AI assistance",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}