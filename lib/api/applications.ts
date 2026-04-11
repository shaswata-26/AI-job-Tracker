import { apiClient } from "@/lib/api/client";
import type {
  ApiResponse,
  Application,
  ApplicationStatus,
  CompleteFollowUpPayload,
  CreateApplicationPayload,
  UpdateApplicationPayload,
  UpdateFollowUpPayload,
} from "@/types";

export async function getApplicationsApi() {
  const response = await apiClient.get<ApiResponse<Application[]>>("/applications");
  return response.data.data;
}

export async function getApplicationByIdApi(id: string) {
  const response = await apiClient.get<ApiResponse<Application>>(`/applications/${id}`);
  return response.data.data;
}

export async function createApplicationApi(payload: CreateApplicationPayload) {
  const response = await apiClient.post<ApiResponse<Application>>("/applications", payload);
  return response.data.data;
}

export async function updateApplicationApi(id: string, payload: UpdateApplicationPayload) {
  const response = await apiClient.patch<ApiResponse<Application>>(`/applications/${id}`, payload);
  return response.data.data;
}

export async function updateApplicationStatusApi(id: string, status: ApplicationStatus) {
  const response = await apiClient.patch<ApiResponse<Application>>(`/applications/${id}/status`, {
    status,
  });
  return response.data.data;
}

export async function updateFollowUpApi(id: string, payload: UpdateFollowUpPayload) {
  const response = await apiClient.patch<ApiResponse<Application>>(
    `/applications/${id}/follow-up`,
    payload
  );
  return response.data.data;
}

export async function completeFollowUpApi(
  id: string,
  payload: CompleteFollowUpPayload = {}
) {
  const response = await apiClient.patch<ApiResponse<Application>>(
    `/applications/${id}/follow-up/complete`,
    payload
  );
  return response.data.data;
}

export async function deleteApplicationApi(id: string) {
  const response = await apiClient.delete<ApiResponse<null>>(`/applications/${id}`);
  return response.data;
}