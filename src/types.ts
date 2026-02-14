export interface IFilter {
  region: string;
  categories: string[];
  budget: string;
  time: string;
}

export type Course = {
  id: string;
  title: string;
  summary: string;
  durationHours?: number;
  tags: string[];
  spots: { name: string; reason: string }[];
};
