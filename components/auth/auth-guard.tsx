"use client";
//components/auth/auth-guard.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { Loader } from "@/components/ui/loader";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, hydrated } = useAuthStore();

  useEffect(() => {
    if (hydrated && !token) {
      router.replace("/login");
    }
  }, [hydrated, token, router]);

  if (!hydrated) {
    return <Loader label="Preparing your workspace..." />;
  }

  if (!token) {
    return <Loader label="Redirecting to login..." />;
  }

  return <>{children}</>;
}