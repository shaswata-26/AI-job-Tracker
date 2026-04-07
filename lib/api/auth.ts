import { apiClient } from "@/lib/api/client";
import type { ApiResponse, AuthResponse, User } from "@/types";

export async function registerApi(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await apiClient.post<ApiResponse<AuthResponse>>("/auth/register", payload);
  return response.data.data;
}

export async function loginApi(payload: { email: string; password: string }) {
  const response = await apiClient.post<ApiResponse<AuthResponse>>("/auth/login", payload);
  return response.data.data;
}

export async function meApi() {
  const response = await apiClient.get<ApiResponse<User>>("/auth/me");
  return response.data.data;
}