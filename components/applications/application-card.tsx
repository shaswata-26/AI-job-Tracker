// "use client";
// //components/applications/application-card.tsx
// import Link from "next/link";
// import { Card } from "@/components/ui/card";
// import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
// import { formatDate } from "@/lib/utils";
// import type { Application } from "@/types";

// export function ApplicationCard({ application }: { application: Application }) {
//   return (
//     <Link href={`/applications/${application._id}`}>
//       <Card className="cursor-pointer p-4 transition hover:-translate-y-0.5 hover:border-brand-200">
//         <div className="flex items-start justify-between gap-3">
//           <div>
//             <h3 className="font-semibold text-slate-900">{application.role}</h3>
//             <p className="mt-1 text-sm text-slate-600">{application.company}</p>
//           </div>
//           <ApplicationStatusBadge status={application.status} />
//         </div>

//         <div className="mt-4 space-y-2 text-xs text-slate-500">
//           <p>Date Applied: {formatDate(application.dateApplied)}</p>
//           {application.location ? <p>Location: {application.location}</p> : null}
//           {application.seniority ? <p>Level: {application.seniority}</p> : null}
//         </div>
//       </Card>
//     </Link>
//   );
// }

"use client";

import Link from "next/link";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { formatDate } from "@/lib/utils";
import type { Application } from "@/types";

type ApplicationCardProps = {
  application: Application;
};

export function ApplicationCard({ application }: ApplicationCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: application._id,
    data: {
      type: "application",
      applicationId: application._id,
      status: application.status,
    },
  });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="touch-none">
      <Card
        className={`p-4 transition hover:-translate-y-0.5 hover:border-brand-200 ${
          isDragging ? "z-50 shadow-2xl ring-2 ring-brand-200" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 gap-3">
            <button
              type="button"
              aria-label={`Drag ${application.role} application card`}
              className="mt-0.5 inline-flex h-8 w-8 shrink-0 cursor-grab items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 active:cursor-grabbing"
              {...listeners}
              {...attributes}
              onClick={(e) => e.preventDefault()}
            >
              <GripVertical className="h-4 w-4" />
            </button>

            <Link
              href={`/applications/${application._id}`}
              className="min-w-0 flex-1"
            >
              <div>
                <h3 className="truncate font-semibold text-slate-900">
                  {application.role}
                </h3>
                <p className="mt-1 truncate text-sm text-slate-600">
                  {application.company}
                </p>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-500">
                <p>Date Applied: {formatDate(application.dateApplied)}</p>
                {application.location ? (
                  <p>Location: {application.location}</p>
                ) : null}
                {application.seniority ? (
                  <p>Level: {application.seniority}</p>
                ) : null}
              </div>
            </Link>
          </div>

          <ApplicationStatusBadge status={application.status} />
        </div>
      </Card>
    </div>
  );
}