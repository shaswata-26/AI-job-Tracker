import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const applicationSchema = z.object({
  company: z.string().trim().min(1, "Company is required"),
  role: z.string().trim().min(1, "Role is required"),
  jdText: z.string().optional(),
  jdLink: z.union([z.string().url("Enter a valid URL"), z.literal(""), z.undefined()]),
  notes: z.string().optional(),
  dateApplied: z.string().min(1, "Date applied is required"),
  status: z.enum(["Applied", "Phone Screen", "Interview", "Offer", "Rejected"]),
  salaryRange: z.string().optional(),
  requiredSkills: z.array(z.string()).default([]),
  niceToHaveSkills: z.array(z.string()).default([]),
  seniority: z.string().optional(),
  location: z.string().optional(),
  resumeSuggestions: z.array(z.string()).default([]),
  followUpDate: z.string().optional(),
  followUpNote: z.string().optional(),
  followUpStatus: z.enum(["pending", "done"]).optional(),
  lastFollowedUpAt: z.string().optional(),
});

export const followUpSchema = z.object({
  followUpDate: z.string().min(1, "Follow-up date is required"),
  followUpNote: z.string().optional(),
});