"use client";
//applications/new/page.tsx
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ApplicationForm } from "@/components/applications/application-form";
import { Loader } from "@/components/ui/loader";
import { getApplicationByIdApi } from "@/lib/api/applications";

export default function NewApplicationPage() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const { data, isLoading } = useQuery({
    queryKey: ["application", editId],
    queryFn: () => getApplicationByIdApi(editId as string),
    enabled: Boolean(editId),
  });

  if (editId && isLoading) {
    return <Loader label="Loading application..." />;
  }

  return <ApplicationForm application={data} />;
}