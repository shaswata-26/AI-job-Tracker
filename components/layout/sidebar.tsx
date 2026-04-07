"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, KanbanSquare, PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/board", label: "Board", icon: KanbanSquare },
  { href: "/applications/new", label: "Add Application", icon: PlusSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
          <BriefcaseBusiness className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-slate-900">Job Tracker</p>
          <p className="text-xs text-slate-500">AI Assisted</p>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                active ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}