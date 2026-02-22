import {
  BUDGET_TAGS,
  CATEGORY_TAGS,
  REGION_TAGS,
  TIMESLOT_TAGS,
} from "@/constants/tags";
import * as z from "zod";

export const DataRequestSchema = z.object({
  region: z.enum(REGION_TAGS, { error: "지역을 선택해주세요" }),
  categories: z
    .array(z.enum(CATEGORY_TAGS, { error: "카테고리를 선택해주세요" }))
    .min(1, { error: "카테고리를 1개 이상 선택해주세요!" }),
  budget: z.enum(BUDGET_TAGS, { error: "예산을 범위를 골라주세요!" }),
  timeslot: z.enum(TIMESLOT_TAGS, { error: "원하는 시간대를 알려주세요!" }),
});

export type DataRequest = z.infer<typeof DataRequestSchema>;
