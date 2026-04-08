// "use client";
// //app/(dashboard)/board/page.tsx
// import Link from "next/link";
// import { useQuery } from "@tanstack/react-query";
// import { KanbanBoard } from "@/components/applications/kanban-board";
// import { EmptyState } from "@/components/ui/empty-state";
// import { Loader } from "@/components/ui/loader";
// import { Button } from "@/components/ui/button";
// import { getApplicationsApi } from "@/lib/api/applications";

// export default function BoardPage() {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["applications"],
//     queryFn: getApplicationsApi,
//   });

//   if (isLoading) return <Loader label="Loading your board..." />;

//   if (isError) {
//     return (
//       <EmptyState
//         title="Could not load applications"
//         description="Please refresh and try again."
//       />
//     );
//   }

//   if (!data?.length) {
//     return (
//       <EmptyState
//         title="No applications yet"
//         description="Create your first job application and start tracking it on the Kanban board."
//         action={
//           <Link href="/applications/new">
//             <Button>Add Application</Button>
//           </Link>
//         }
//       />
//     );
//   }

//   return <KanbanBoard applications={data} />;
// }

"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { KanbanBoard } from "@/components/applications/kanban-board";
import { ApplicationStats } from "@/components/applications/application-stats";
import { EmptyState } from "@/components/ui/empty-state";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { getApplicationsApi } from "@/lib/api/applications";

export default function BoardPage() {
  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplicationsApi,
  });

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
        <KanbanBoard applications={applications} />
      )}
    </div>
  );
}