import * as z from "zod";

export const SpotSchema = z.object({
  order: z.number(),
  query: z.string().min(1, { error: "spot.query is required." }),
  nameHint: z.string().min(1, { error: "spot.nameHint is required." }),
  reason: z.string().min(1, { error: "spot.reason is required." }),
});

export const CourseSchema = z.object({
  id: z.enum(["c1", "c2", "c3"]),
  title: z.string().min(1, { error: "course.title is required." }),
  summary: z.string().min(1, { error: "course.summary is required." }),
  durationHours: z.number().int().min(1).max(12),
  tags: z.array(z.string().min(1)).min(1),
  spots: z.array(SpotSchema).min(2),
});

export const RecommendResponseSchema = z.object({
  courses: z
    .array(CourseSchema)
    .length(3, { error: "courses must be exactly 3." }),
});

export type Spot = z.infer<typeof SpotSchema>;
export type CourseObj = z.infer<typeof CourseSchema>;
export type RecommendResponse = z.infer<typeof RecommendResponseSchema>;
