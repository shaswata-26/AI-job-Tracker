"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteApplicationApi } from "@/lib/api/applications";
import { formatDate, extractErrorMessage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import type { Application } from "@/types";

export function ApplicationDetail({ application }: { application: Application }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteApplicationApi(application._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application deleted");
      router.push("/board");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{application.role}</h1>
          <p className="mt-1 text-slate-600">{application.company}</p>
          <div className="mt-3">
            <ApplicationStatusBadge status={application.status} />
          </div>
        </div>

        <div className="flex gap-3">
          <Link href={`/applications/new?edit=${application._id}`}>
            <Button variant="secondary">Quick Edit</Button>
          </Link>
          <Button variant="danger" onClick={() => deleteMutation.mutate()} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-3 font-semibold text-slate-900">Details</h2>
          <div className="space-y-2 text-sm text-slate-700">
            <p><strong>Date Applied:</strong> {formatDate(application.dateApplied)}</p>
            <p><strong>Location:</strong> {application.location || "—"}</p>
            <p><strong>Seniority:</strong> {application.seniority || "—"}</p>
            <p><strong>Salary Range:</strong> {application.salaryRange || "—"}</p>
            <p><strong>JD Link:</strong> {application.jdLink ? <a className="text-brand-600" href={application.jdLink} target="_blank">Open link</a> : "—"}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-semibold text-slate-900">Skills</h2>
          <div className="space-y-3 text-sm text-slate-700">
            <div>
              <p className="font-medium">Required Skills</p>
              <p>{application.requiredSkills.length ? application.requiredSkills.join(", ") : "—"}</p>
            </div>
            <div>
              <p className="font-medium">Nice to Have Skills</p>
              <p>{application.niceToHaveSkills.length ? application.niceToHaveSkills.join(", ") : "—"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 font-semibold text-slate-900">Notes</h2>
        <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">{application.notes || "No notes added"}</p>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 font-semibold text-slate-900">Resume Suggestions</h2>
        <div className="space-y-3">
          {application.resumeSuggestions.length ? (
            application.resumeSuggestions.map((item, index) => (
              <div key={`${item}-${index}`} className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700">
                {item}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No suggestions available.</p>
          )}
        </div>
      </div>
    </Card>
  );
}