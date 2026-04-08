import { apiClient } from "@/lib/api/client";
import type {
  ApiResponse,
  ParsedJobDescription,
  ResumeSuggestionsResponse,
} from "@/types";
//lib/api/ai.ts
export async function parseJobDescriptionApi(jdText: string) {
  const response = await apiClient.post<ApiResponse<ParsedJobDescription>>(
    "/ai/parse-job-description",
    { jdText }
  );
  return response.data.data;
}

export async function generateResumeSuggestionsApi(payload: {
  companyName: string;
  role: string;
  requiredSkills: string[];
  seniority?: string;
}) {
  const response = await apiClient.post<ApiResponse<ResumeSuggestionsResponse>>(
    "/ai/resume-suggestions",
    payload
  );
  return response.data.data;
}