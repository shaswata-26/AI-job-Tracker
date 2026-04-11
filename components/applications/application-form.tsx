"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { APP_STATUSES } from "@/lib/constants";
import { createApplicationApi, updateApplicationApi } from "@/lib/api/applications";
import { extractErrorMessage } from "@/lib/utils";

import { ParseJobForm } from "@/components/ai/parse-job-form";
import { ResumeSuggestions } from "@/components/ai/resume-suggestions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import type {
  Application,
  ApplicationStatus,
  CreateApplicationPayload,
} from "@/types";

type ApplicationFormState = {
  company: string;
  role: string;
  jdLink: string;
  notes: string;
  dateApplied: string;
  status: ApplicationStatus;
  salaryRange: string;
  seniority: string;
  location: string;
  followUpDate: string;
  followUpNote: string;
};

function parseCommaSeparated(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getInitialFormState(application?: Application): ApplicationFormState {
  return {
    company: application?.company ?? "",
    role: application?.role ?? "",
    jdLink: application?.jdLink ?? "",
    notes: application?.notes ?? "",
    dateApplied: application?.dateApplied
      ? new Date(application.dateApplied).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    status: application?.status ?? "Applied",
    salaryRange: application?.salaryRange ?? "",
    seniority: application?.seniority ?? "",
    location: application?.location ?? "",
    followUpDate: application?.followUpDate
      ? new Date(application.followUpDate).toISOString().slice(0, 10)
      : "",
    followUpNote: application?.followUpNote ?? "",
  };
}

export function ApplicationForm({ application }: { application?: Application }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [jdText, setJdText] = useState<string>(application?.jdText ?? "");
  const [requiredSkillsInput, setRequiredSkillsInput] = useState<string>(
    application?.requiredSkills.join(", ") ?? ""
  );
  const [niceToHaveSkillsInput, setNiceToHaveSkillsInput] = useState<string>(
    application?.niceToHaveSkills.join(", ") ?? ""
  );
  const [resumeSuggestions, setResumeSuggestions] = useState<string[]>(
    application?.resumeSuggestions ?? []
  );
  const [form, setForm] = useState<ApplicationFormState>(getInitialFormState(application));

  const payload = useMemo<CreateApplicationPayload>(
    () => ({
      company: form.company,
      role: form.role,
      jdText,
      jdLink: form.jdLink,
      notes: form.notes,
      dateApplied: form.dateApplied,
      status: form.status,
      salaryRange: form.salaryRange,
      requiredSkills: parseCommaSeparated(requiredSkillsInput),
      niceToHaveSkills: parseCommaSeparated(niceToHaveSkillsInput),
      seniority: form.seniority,
      location: form.location,
      resumeSuggestions,
      followUpDate: form.followUpDate
        ? new Date(form.followUpDate).toISOString()
        : undefined,
      followUpNote: form.followUpNote || undefined,
      followUpStatus: application?.followUpStatus ?? "pending",
      lastFollowedUpAt: application?.lastFollowedUpAt,
    }),
    [form, jdText, requiredSkillsInput, niceToHaveSkillsInput, resumeSuggestions, application]
  );

  const mutation = useMutation({
    mutationFn: async () => {
      if (application?._id) {
        return updateApplicationApi(application._id, payload);
      }

      return createApplicationApi(payload);
    },
    onSuccess: (saved) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application", saved._id] });

      toast.success(application ? "Application updated" : "Application created");
      router.push(`/applications/${saved._id}`);
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });

  return (
    <div className="space-y-6">
      <ParseJobForm
        jdText={jdText}
        onChange={setJdText}
        onParsed={(parsed) => {
          setForm((prev) => ({
            ...prev,
            company: parsed.companyName || prev.company,
            role: parsed.role || prev.role,
            seniority: parsed.seniority || prev.seniority,
            location: parsed.location || prev.location,
          }));

          setRequiredSkillsInput(parsed.requiredSkills.join(", "));
          setNiceToHaveSkillsInput(parsed.niceToHaveSkills.join(", "));
        }}
        onSuggestions={setResumeSuggestions}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">
            {application ? "Edit Application" : "Create Application"}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Company"
              value={form.company}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  company: e.target.value,
                }))
              }
            />

            <Input
              placeholder="Role"
              value={form.role}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
            />

            <Input
              type="date"
              value={form.dateApplied}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  dateApplied: e.target.value,
                }))
              }
            />

            <Select
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  status: e.target.value as ApplicationStatus,
                }))
              }
            >
              {APP_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>

            <Input
              placeholder="JD link"
              value={form.jdLink}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  jdLink: e.target.value,
                }))
              }
            />

            <Input
              placeholder="Salary range"
              value={form.salaryRange}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  salaryRange: e.target.value,
                }))
              }
            />

            <Input
              placeholder="Seniority"
              value={form.seniority}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  seniority: e.target.value,
                }))
              }
            />

            <Input
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
            />

            <Input
              type="date"
              value={form.followUpDate}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  followUpDate: e.target.value,
                }))
              }
            />

            <Input
              placeholder="Follow-up note"
              value={form.followUpNote}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  followUpNote: e.target.value,
                }))
              }
            />
          </div>

          <Input
            placeholder="Required skills (comma separated)"
            value={requiredSkillsInput}
            onChange={(e) => setRequiredSkillsInput(e.target.value)}
          />

          <Input
            placeholder="Nice to have skills (comma separated)"
            value={niceToHaveSkillsInput}
            onChange={(e) => setNiceToHaveSkillsInput(e.target.value)}
          />

          <Textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
          />

          <Button
            type="button"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Saving..."
              : application
                ? "Update Application"
                : "Save Application"}
          </Button>
        </div>

        <ResumeSuggestions suggestions={resumeSuggestions} />
      </div>
    </div>
  );
}