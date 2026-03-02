import { Budget, Category, Region, Timeslot } from "./constants/tags";
import { CourseObj } from "./lib/reco/output-schema";
export interface IFilter {
  region: Region | "";
  categories: Category[];
  budget: Budget | "";
  timeslot: Timeslot | "";
}

export type RowItem = {
  parsedId: string;
  item: CourseObj;
  resultId: string;
};
