"use client";

type StatsCardProps = {
  label: string;
  value: number;
  helper?: string;
};

export function StatsCard({ label, value, helper }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
      {helper ? <p className="mt-2 text-xs text-slate-400">{helper}</p> : null}
    </div>
  );
}