import { Json } from "../../../types_db";

// JSON-safe 변환: undefined 제거
export function toJson<T>(value: T): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}
