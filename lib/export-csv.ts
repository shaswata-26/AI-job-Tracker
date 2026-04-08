import type { Application } from "@/types";

function escapeCSVValue(value: string | number | null | undefined) {
  const stringValue = String(value ?? "");
  return `"${stringValue.replace(/"/g, '""')}"`;
}

export function exportApplicationsToCSV(applications: Application[]) {
  if (!applications.length) return;

  const headers = [
    "Company",
    "Role",
    "Status",
    "Date Applied",
    "Location",
    "Seniority",
    "Salary Range",
    "JD Link",
    "Required Skills",
    "Nice to Have Skills",
    "Notes",
  ];

  const rows = applications.map((application) => [
    application.company,
    application.role,
    application.status,
    application.dateApplied,
    application.location ?? "",
    application.seniority ?? "",
    application.salaryRange ?? "",
    application.jdLink ?? "",
    application.requiredSkills.join(", "),
    application.niceToHaveSkills.join(", "),
    application.notes ?? "",
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => escapeCSVValue(cell)).join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", "applications.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}