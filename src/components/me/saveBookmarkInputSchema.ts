import * as z from "zod";

export const saveBookmarkInputSchema = z.object({
  course_key: z.enum(["c1", "c2", "c3"]),
  source_recommend_id: z.string(),
  snapshot: z.unknown(),
});

export type SaveBookmarkObj = z.infer<typeof saveBookmarkInputSchema>;
