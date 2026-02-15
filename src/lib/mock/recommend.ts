import { Course } from "@/types";

export const mockRecommend: { courses: Course[] } = {
  courses: [
    {
      id: "c1",
      title: "도심 힐링 산책 코스",
      summary: "카페-공원-야경으로 가볍게 하루 마무리",
      durationHours: 5,
      tags: ["산책", "감성", "야경"],
      spots: [
        {
          name: "로스터리 카페",
          address: "서울 성동구 성수이로 XX",
          reason: "대기 적고 분위기 좋은 시작점",
        },
        {
          name: "근처 공원",
          address: "서울 성동구 왕십리로 XX",
          reason: "소화 겸 산책하기 딱 좋아요",
        },
        {
          name: "전망 포인트",
          address: "서울 성동구 서울숲길 XX",
          reason: "해질 무렵 사진/야경 맛집",
        },
      ],
    },
    {
      id: "c2",
      title: "맛집 중심 먹방 코스",
      summary: "점심-디저트-저녁까지 실패 확률 낮춘 구성",
      durationHours: 6,
      tags: ["맛집", "웨이팅", "디저트"],
      spots: [
        {
          name: "현지인 점심 맛집",
          address: "서울 성동구 성수이로 XX",
          reason: "회전율 좋아서 대기 짧음",
        },
        {
          name: "디저트 카페",
          address: "서울 성동구 왕십리로 XX",
          reason: "식후 달달하게 정리",
        },
        {
          name: "저녁 인기 메뉴",
          address: "서울 성동구 서울숲길 XX",
          reason: "하루 마무리로 만족도 높음",
        },
      ],
    },
    {
      id: "c3",
      title: "비 오는 날 실내 코스",
      summary: "전시-쇼핑-카페로 날씨 변수 대응",
      durationHours: 4,
      tags: ["실내", "전시", "비오는날"],
      spots: [
        {
          name: "전시/미술관",
          address: "서울 성동구 성수이로 XX",
          reason: "비 피하면서 콘텐츠 확보",
        },
        {
          name: "복합몰",
          address: "서울 성동구 왕십리로 XX",
          reason: "동선 짧고 선택지 많음",
        },
        {
          name: "조용한 카페",
          address: "서울 성동구 서울숲길 XX",
          reason: "마무리로 쉬기 좋음",
        },
      ],
    },
  ],
};
