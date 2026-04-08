// import { ApplicationCard } from "@/components/applications/application-card";
// import { Card } from "@/components/ui/card";
// import type { Application, ApplicationStatus } from "@/types";
// //components/applications/board-column.tsx
// export function BoardColumn({
//   title,
//   items,
// }: {
//   title: ApplicationStatus;
//   items: Application[];
// }) {
//   return (
//     <div className="min-w-[280px] flex-1">
//       <div className="mb-3 flex items-center justify-between">
//         <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
//         <span className="rounded-full bg-slate-200 px-2 py-1 text-xs text-slate-700">
//           {items.length}
//         </span>
//       </div>

//       <Card className="min-h-[400px] space-y-3 bg-slate-50 p-3">
//         {items.map((item) => (
//           <ApplicationCard key={item._id} application={item} />
//         ))}
//       </Card>
//     </div>
//   );
// }

"use client";

import { useDroppable } from "@dnd-kit/core";

import { ApplicationCard } from "@/components/applications/application-card";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Application, ApplicationStatus } from "@/types";

type BoardColumnProps = {
  title: ApplicationStatus;
  items: Application[];
};

export function BoardColumn({ title, items }: BoardColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: title,
    data: {
      type: "column",
      status: title,
    },
  });

  return (
    <div className="min-w-[280px] flex-1">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        <span className="rounded-full bg-slate-200 px-2 py-1 text-xs text-slate-700">
          {items.length}
        </span>
      </div>

      <Card
        ref={setNodeRef}
        className={cn(
          "min-h-[400px] space-y-3 bg-slate-50 p-3 transition-colors",
          isOver && "border-brand-300 bg-brand-50/60"
        )}
      >
        {items.length > 0 ? (
          items.map((item) => (
            <ApplicationCard key={item._id} application={item} />
          ))
        ) : (
          <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-400">
            Drop application here
          </div>
        )}
      </Card>
    </div>
  );
}