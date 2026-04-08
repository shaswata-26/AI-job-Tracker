
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { KanbanBoard } from "@/components/applications/kanban-board";
import { ApplicationStats } from "@/components/applications/application-stats";
import { BoardFilters } from "@/components/applications/board-filters";
import { EmptyState } from "@/components/ui/empty-state";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { getApplicationsApi } from "@/lib/api/applications";
import type { ApplicationStatus } from "@/types";

export default function BoardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ApplicationStatus>("All");

  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplicationsApi,
  });

  const filteredApplications = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesSearch =
        normalizedSearch === "" ||
        application.company.toLowerCase().includes(normalizedSearch) ||
        application.role.toLowerCase().includes(normalizedSearch) ||
        (application.location ?? "").toLowerCase().includes(normalizedSearch) ||
        (application.seniority ?? "").toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader label="Loading your board..." />
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Could not load applications"
        description="Please refresh and try again."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Job Application Tracker
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your applications and monitor progress across each hiring stage.
          </p>
        </div>

        <Link href="/applications/new">
          <Button>Add Application</Button>
        </Link>
      </div>

      <ApplicationStats applications={applications} />

      {applications.length === 0 ? (
        <EmptyState
          title="No applications yet"
          description="Create your first job application and start tracking it on the Kanban board."
          action={
            <Link href="/applications/new">
              <Button>Add Application</Button>
            </Link>
          }
        />
      ) : (
        <>
          <BoardFilters
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={setSearchTerm}
            onStatusChange={setStatusFilter}
          />

          {filteredApplications.length === 0 ? (
            <EmptyState
              title="No matching applications"
              description="Try changing your search or filter."
            />
          ) : (
            <KanbanBoard applications={filteredApplications} />
          )}
        </>
      )}
    </div>
  );
}