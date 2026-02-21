import { Budget, Category, Region, Time } from "./constants/tags";

export interface IFilter {
  region: Region | "";
  categories: Category[];
  budget: Budget | "";
  time: Time | "";
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
