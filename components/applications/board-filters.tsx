"use client";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { APP_STATUSES } from "@/lib/constants";
import type { ApplicationStatus } from "@/types";

type BoardFiltersProps = {
  searchTerm: string;
  statusFilter: "All" | ApplicationStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "All" | ApplicationStatus) => void;
};

export function BoardFilters({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: BoardFiltersProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2">
      <Input
        placeholder="Search by company, role, location, seniority..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Select
        value={statusFilter}
        onChange={(e) =>
          onStatusChange(e.target.value as "All" | ApplicationStatus)
        }
      >
        <option value="All">All Statuses</option>
        {APP_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </Select>
    </div>
  );
}