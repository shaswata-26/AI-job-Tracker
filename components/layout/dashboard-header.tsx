"use client";
//components/layout/dashboard-header.tsx
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";

export function DashboardHeader() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">AI Job Tracker</h1>
        <p className="text-sm text-slate-500">Welcome, {user?.name || user?.email}</p>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/applications/new">
          <Button>Add Application</Button>
        </Link>
        <Button
          variant="secondary"
          onClick={() => {
            clearAuth();
            router.replace("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}