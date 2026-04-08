"use client";
//app/(dashboard)/board/page.tsx
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { KanbanBoard } from "@/components/applications/kanban-board";
import { EmptyState } from "@/components/ui/empty-state";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { getApplicationsApi } from "@/lib/api/applications";

export default function BoardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplicationsApi,
  });

  if (isLoading) return <Loader label="Loading your board..." />;

  if (isError) {
    return (
      <EmptyState
        title="Could not load applications"
        description="Please refresh and try again."
      />
    );
  }

  if (!data?.length) {
    return (
      <EmptyState
        title="No applications yet"
        description="Create your first job application and start tracking it on the Kanban board."
        action={
          <Link href="/applications/new">
            <Button>Add Application</Button>
          </Link>
        }
      />
    );
  }

  return <KanbanBoard applications={data} />;
}