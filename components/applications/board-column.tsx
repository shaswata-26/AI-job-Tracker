import { ApplicationCard } from "@/components/applications/application-card";
import { Card } from "@/components/ui/card";
import type { Application, ApplicationStatus } from "@/types";

export function BoardColumn({
  title,
  items,
}: {
  title: ApplicationStatus;
  items: Application[];
}) {
  return (
    <div className="min-w-[280px] flex-1">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        <span className="rounded-full bg-slate-200 px-2 py-1 text-xs text-slate-700">
          {items.length}
        </span>
      </div>

      <Card className="min-h-[400px] space-y-3 bg-slate-50 p-3">
        {items.map((item) => (
          <ApplicationCard key={item._id} application={item} />
        ))}
      </Card>
    </div>
  );
}