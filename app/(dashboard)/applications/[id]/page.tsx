"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ApplicationDetail } from "@/components/applications/application-detail";
import { EmptyState } from "@/components/ui/empty-state";
import { Loader } from "@/components/ui/loader";
import { getApplicationByIdApi } from "@/lib/api/applications";

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["application", params.id],
    queryFn: () => getApplicationByIdApi(params.id),
    enabled: Boolean(params.id),
  });

  if (isLoading) return <Loader label="Loading application details..." />;

  if (isError || !data) {
    return (
      <EmptyState
        title="Application not found"
        description="The application you are looking for does not exist or is no longer available."
      />
    );
  }

  return <ApplicationDetail application={data} />;
}