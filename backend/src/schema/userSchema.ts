import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  userType: z.enum(["admin", "customer", "service_provider"]),
});

export const userLoginSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const updateServiceProviderStatusSchema = z.object({
  userId: z.string(),
  status: z.enum(["active", "inactive"]),
});
