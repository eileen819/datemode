/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spot } from "./output-schema";

export type verifiedSpot = Spot & {
  lat?: number;
  lng?: number;
  mapStatus: "verified" | "not_found" | "error";
};

export function verifySpot(spot: Spot): Promise<verifiedSpot> {
  return new Promise((resolve) => {
    const kakao = window.kakao;
    if (!kakao.maps.services.Places) {
      resolve({
        ...spot,
        mapStatus: "error",
      });
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(spot.query, (data: any[], status: any) => {
      if (status === kakao.maps.services.Status.OK && data.length > 0) {
        resolve({
          ...spot,
          lat: Number(data[0].y),
          lng: Number(data[0].x),
          mapStatus: "verified",
        });
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        resolve({
          ...spot,
          mapStatus: "not_found",
        });
      } else {
        resolve({
          ...spot,
          mapStatus: "error",
        });
      }
    });
  });
}
