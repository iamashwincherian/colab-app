import { z } from "zod";

export const loginCredentialSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  isRegistration: z.coerce.boolean().optional().default(false),
});

export const registerCredentialSchema = z.object({
  ...loginCredentialSchema.shape,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Should contain atleast 8 characters" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

export const verifyEmailSchema = z.object({
  otp1: z.string().max(1),
  otp2: z.string().max(1),
  otp3: z.string().max(1),
  otp4: z.string().max(1),
});

export const passwordResetEmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const passwordResetSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Should contain atleast 8 characters" }),
});
