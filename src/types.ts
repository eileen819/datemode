export interface IFilter {
  region: string;
  categories: string[];
  budget: string;
  time: string;
}

export type Spot = {
  name: string;
  address: string;
  reason: string;
  // 나중에 좌표 붙일 자리
  // lat?: number;
  // lng?: number;
};

export type Course = {
  id: string;
  title: string;
  summary: string;
  durationHours?: number;
  tags: string[];
  spots: Spot[];
};
