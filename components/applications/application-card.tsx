"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { formatDate } from "@/lib/utils";
import type { Application } from "@/types";

export function ApplicationCard({ application }: { application: Application }) {
  return (
    <Link href={`/applications/${application._id}`}>
      <Card className="cursor-pointer p-4 transition hover:-translate-y-0.5 hover:border-brand-200">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-900">{application.role}</h3>
            <p className="mt-1 text-sm text-slate-600">{application.company}</p>
          </div>
          <ApplicationStatusBadge status={application.status} />
        </div>

        <div className="mt-4 space-y-2 text-xs text-slate-500">
          <p>Date Applied: {formatDate(application.dateApplied)}</p>
          {application.location ? <p>Location: {application.location}</p> : null}
          {application.seniority ? <p>Level: {application.seniority}</p> : null}
        </div>
      </Card>
    </Link>
  );
}