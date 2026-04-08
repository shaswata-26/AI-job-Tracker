"use client";
//components/ai/resume-suggestions.tsx
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ResumeSuggestions({ suggestions }: { suggestions: string[] }) {
  if (!suggestions.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <h3 className="text-lg font-semibold text-slate-900">AI Resume Suggestions</h3>
      <div className="mt-4 space-y-3">
        {suggestions.map((item, index) => (
          <div key={`${item}-${index}`} className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-700">{item}</p>
            <Button
              type="button"
              variant="secondary"
              className="mt-3"
              onClick={async () => {
                await navigator.clipboard.writeText(item);
                toast.success("Copied suggestion");
              }}
            >
              Copy
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}