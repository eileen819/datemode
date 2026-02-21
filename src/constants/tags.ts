export const REGION_TAGS = [
  "강남",
  "홍대",
  "성수",
  "잠실",
  "용산",
  "연남",
  "합정",
  "신촌",
  "이태원",
  "한남",
] as const;
export type Region = (typeof REGION_TAGS)[number];

export const CATEGORY_TAGS = ["맛집", "카페", "전시", "산책"] as const;
export type Category = (typeof CATEGORY_TAGS)[number];

export const BUDGET_TAGS = [
  "~3만원",
  "3~6만원",
  "6~10만원",
  "10만원+",
] as const;
export type Budget = (typeof BUDGET_TAGS)[number];

export const TIME_TAGS = [
  "오전(9~12시)",
  "오후(12~18시)",
  "저녁(18~22시)",
] as const;
export type Timeslot = (typeof TIME_TAGS)[number];
