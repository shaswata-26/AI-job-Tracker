"use client";
//components/ai/parse-job-form.tsx
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { parseJobDescriptionApi, generateResumeSuggestionsApi } from "@/lib/api/ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { extractErrorMessage } from "@/lib/utils";
import type { ParsedJobDescription } from "@/types";

export function ParseJobForm({
  jdText,
  onChange,
  onParsed,
  onSuggestions,
}: {
  jdText: string;
  onChange: (value: string) => void;
  onParsed: (value: ParsedJobDescription) => void;
  onSuggestions: (value: string[]) => void;
}) {
  const parseMutation = useMutation({
    mutationFn: parseJobDescriptionApi,
    onSuccess: async (data) => {
      onParsed(data);
      toast.success("Job description parsed successfully");

      try {
        const suggestionResult = await generateResumeSuggestionsApi({
          companyName: data.companyName,
          role: data.role,
          requiredSkills: data.requiredSkills,
          seniority: data.seniority,
        });
        onSuggestions(suggestionResult.suggestions);
      } catch (error) {
        toast.error(extractErrorMessage(error));
      }
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">AI Job Description Parser</h3>
        <p className="mt-1 text-sm text-slate-600">
          Paste the job description and let AI extract company, role, skills, seniority, and location.
        </p>
      </div>

      <Textarea
        placeholder="Paste job description here..."
        value={jdText}
        onChange={(e) => onChange(e.target.value)}
      />

      <Button
        type="button"
        onClick={() => parseMutation.mutate(jdText)}
        disabled={parseMutation.isPending || !jdText.trim()}
      >
        {parseMutation.isPending ? "Parsing with AI..." : "Parse Job Description"}
      </Button>
    </div>
  );
}