import type { ApplicationStatus } from "@/types";
//components/applications/application-status-badge.tsx
const badgeMap: Record<ApplicationStatus, string> = {
  Applied: "bg-slate-100 text-slate-800",
  "Phone Screen": "bg-blue-100 text-blue-800",
  Interview: "bg-amber-100 text-amber-800",
  Offer: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-rose-100 text-rose-800",
};

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${badgeMap[status]}`}>
      {status}
    </span>
  );
}