export type ApplicationStatus =
  | "Applied"
  | "Phone Screen"
  | "Interview"
  | "Offer"
  | "Rejected";

export type FollowUpStatus = "pending" | "done";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: unknown;
}

export interface ParsedJobDescription {
  companyName: string;
  role: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  seniority: string;
  location: string;
}

export interface ResumeSuggestionsResponse {
  suggestions: string[];
}

export interface Application {
  _id: string;
  userId: string;
  company: string;
  role: string;
  jdText?: string;
  jdLink?: string;
  notes?: string;
  dateApplied: string;
  status: ApplicationStatus;
  salaryRange?: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  seniority?: string;
  location?: string;
  resumeSuggestions: string[];
  followUpDate?: string;
  followUpNote?: string;
  followUpStatus: FollowUpStatus;
  lastFollowedUpAt?: string;
  isOverdue: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationPayload {
  company: string;
  role: string;
  jdText?: string;
  jdLink?: string;
  notes?: string;
  dateApplied: string;
  status: ApplicationStatus;
  salaryRange?: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  seniority?: string;
  location?: string;
  resumeSuggestions: string[];
  followUpDate?: string;
  followUpNote?: string;
  followUpStatus?: FollowUpStatus;
  lastFollowedUpAt?: string;
}

export type UpdateApplicationPayload = Partial<CreateApplicationPayload>;

export interface UpdateFollowUpPayload {
  followUpDate: string;
  followUpNote?: string;
}

export interface CompleteFollowUpPayload {
  lastFollowedUpAt?: string;
}