"use client";

import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { APP_STATUSES } from "@/lib/constants";
import { updateApplicationStatusApi } from "@/lib/api/applications";
import { extractErrorMessage } from "@/lib/utils";
import { BoardColumn } from "@/components/applications/board-column";
import type { Application, ApplicationStatus } from "@/types";

export function KanbanBoard({ applications }: { applications: Application[] }) {
  const queryClient = useQueryClient();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      updateApplicationStatusApi(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application status updated");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });

  const grouped = APP_STATUSES.reduce<Record<ApplicationStatus, Application[]>>((acc, status) => {
    acc[status] = applications.filter((app) => app.status === status);
    return acc;
  }, {
    Applied: [],
    "Phone Screen": [],
    Interview: [],
    Offer: [],
    Rejected: [],
  });

  const onDragEnd = (event: DragEndEvent) => {
    const activeId = String(event.active.id);
    const overId = event.over ? String(event.over.id) : null;

    if (!overId) return;

    const application = applications.find((item) => item._id === activeId);
    if (!application) return;

    const nextStatus = APP_STATUSES.find((status) => status === overId) ?? application.status;
    if (application.status === nextStatus) return;

    statusMutation.mutate({ id: activeId, status: nextStatus });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="grid gap-4 xl:grid-cols-5">
        {APP_STATUSES.map((status) => (
          <div key={status} id={status}>
            <BoardColumn title={status} items={grouped[status]} />
          </div>
        ))}
      </div>
    </DndContext>
  );
}