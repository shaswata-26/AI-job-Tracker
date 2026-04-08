"use client";

import { useMemo } from "react";
import { StatsCard } from "@/components/applications/stats-card";
import type { Application } from "@/types";

type ApplicationStatsProps = {
  applications: Application[];
};

export function ApplicationStats({ applications }: ApplicationStatsProps) {
  const stats = useMemo(() => {
    const total = applications.length;

    const applied = applications.filter((app) => app.status === "Applied").length;
    const phoneScreen = applications.filter(
      (app) => app.status === "Phone Screen"
    ).length;
    const interview = applications.filter(
      (app) => app.status === "Interview"
    ).length;
    const offer = applications.filter((app) => app.status === "Offer").length;
    const rejected = applications.filter(
      (app) => app.status === "Rejected"
    ).length;

    return {
      total,
      applied,
      phoneScreen,
      interview,
      offer,
      rejected,
    };
  }, [applications]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
      <StatsCard label="Total Applications" value={stats.total} />
      <StatsCard label="Applied" value={stats.applied} />
      <StatsCard label="Phone Screen" value={stats.phoneScreen} />
      <StatsCard label="Interview" value={stats.interview} />
      <StatsCard label="Offer" value={stats.offer} />
      <StatsCard label="Rejected" value={stats.rejected} />
    </div>
  );
}