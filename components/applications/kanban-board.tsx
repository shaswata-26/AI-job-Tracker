// "use client";
// //components/applications/kanban-board.tsx
// import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { APP_STATUSES } from "@/lib/constants";
// import { updateApplicationStatusApi } from "@/lib/api/applications";
// import { extractErrorMessage } from "@/lib/utils";
// import { BoardColumn } from "@/components/applications/board-column";
// import type { Application, ApplicationStatus } from "@/types";

// export function KanbanBoard({ applications }: { applications: Application[] }) {
//   const queryClient = useQueryClient();
//   const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

//   const statusMutation = useMutation({
//     mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
//       updateApplicationStatusApi(id, status),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["applications"] });
//       toast.success("Application status updated");
//     },
//     onError: (error) => {
//       toast.error(extractErrorMessage(error));
//     },
//   });

//   const grouped = APP_STATUSES.reduce<Record<ApplicationStatus, Application[]>>((acc, status) => {
//     acc[status] = applications.filter((app) => app.status === status);
//     return acc;
//   }, {
//     Applied: [],
//     "Phone Screen": [],
//     Interview: [],
//     Offer: [],
//     Rejected: [],
//   });

//   const onDragEnd = (event: DragEndEvent) => {
//     const activeId = String(event.active.id);
//     const overId = event.over ? String(event.over.id) : null;

//     if (!overId) return;

//     const application = applications.find((item) => item._id === activeId);
//     if (!application) return;

//     const nextStatus = APP_STATUSES.find((status) => status === overId) ?? application.status;
//     if (application.status === nextStatus) return;

//     statusMutation.mutate({ id: activeId, status: nextStatus });
//   };

//   return (
//     <DndContext sensors={sensors} onDragEnd={onDragEnd}>
//       <div className="grid gap-4 xl:grid-cols-5">
//         {APP_STATUSES.map((status) => (
//           <div key={status} id={status}>
//             <BoardColumn title={status} items={grouped[status]} />
//           </div>
//         ))}
//       </div>
//     </DndContext>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { APP_STATUSES } from "@/lib/constants";
import { updateApplicationStatusApi } from "@/lib/api/applications";
import { extractErrorMessage } from "@/lib/utils";
import { BoardColumn } from "@/components/applications/board-column";
import type { Application, ApplicationStatus } from "@/types";

type KanbanBoardProps = {
  applications: Application[];
};

export function KanbanBoard({ applications }: KanbanBoardProps) {
  const queryClient = useQueryClient();
  const [boardItems, setBoardItems] = useState<Application[]>(applications);

  useEffect(() => {
    setBoardItems(applications);
  }, [applications]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      updateApplicationStatusApi(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application status updated");
    },

    onError: (error, variables) => {
      setBoardItems(applications);
      toast.error(extractErrorMessage(error));

      // Optional fallback sync
      queryClient.invalidateQueries({ queryKey: ["applications"] });

      console.error("Failed to update status:", variables);
    },
  });

  const grouped = useMemo(() => {
    return APP_STATUSES.reduce<Record<ApplicationStatus, Application[]>>(
      (acc, status) => {
        acc[status] = boardItems.filter((app) => app.status === status);
        return acc;
      },
      {
        Applied: [],
        "Phone Screen": [],
        Interview: [],
        Offer: [],
        Rejected: [],
      }
    );
  }, [boardItems]);

  const onDragEnd = (event: DragEndEvent) => {
    const activeId = String(event.active.id);
    const overId = event.over ? String(event.over.id) : null;

    if (!overId) return;

    const draggedApplication = boardItems.find((item) => item._id === activeId);
    if (!draggedApplication) return;

    const nextStatus = APP_STATUSES.includes(overId as ApplicationStatus)
      ? (overId as ApplicationStatus)
      : draggedApplication.status;

    if (draggedApplication.status === nextStatus) return;

    setBoardItems((prev) =>
      prev.map((item) =>
        item._id === activeId ? { ...item, status: nextStatus } : item
      )
    );

    statusMutation.mutate({
      id: activeId,
      status: nextStatus,
    });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="grid gap-4 xl:grid-cols-5">
        {APP_STATUSES.map((status) => (
          <BoardColumn
            key={status}
            title={status}
            items={grouped[status]}
          />
        ))}
      </div>
    </DndContext>
  );
}