import { z } from "zod";

export const addFeedbackSchema = z.object({
  userId: z.string(),
  feedback: z.string(),
  star_rating: z.number(),
});

export const updateFeedbackSchema = z.object({
  feedback: z.string(),
  star_rating: z.number(),
});
