import { DataRequest } from "./input-schema";

export function createDateCoursePrompt(data: DataRequest) {
  const { region, categories, budget, timeslot } = data;

  return `
    너는 20대, 30대 커플/친구 취향을 잘 아는 데이트 코스 플래너야.
    반드시 실제 존재하며 카카오맵에서 검색 가능한 장소들로 입력받은 조건에 맞춰서 코스 3개를 추천해 줘.
    코스 구성은 감성적으로, 하지만 결과는 반드시 JSON만 출력해.
    설명/코드블록/백틱/추가 문장 절대 금지.

    입력 조건:
    - 지역: ${region}
    - 카테고리: ${categories.join(", ")}
    - 예산: ${budget}
    - 시간대: ${timeslot}
    
    출력 형식:
    {
      "courses": [
        {
          "id": "c1",
          "title": "string",
          "summary": "string",
          "durationHours": number,
          "tags": ["string", "string", "string"],
          "spots": [
            {
              "order": 1,
              "query": "string",
              "nameHint": "string",
              "reason": "string"
            }
          ]
        }
      ]
    }

    규칙:
    - courses는 반드시 3개의 코스 객체를 담고 있어야 함
    - 'id'는 "c1", "c2", "c3"로 함
    - 'title'의 글자 수는 한글, 영어 포함해서 20자이내로 제한
    - 'summary'는 코스의 전체 분위기를 한눈에 알 수 있게 감성적으로 짓기 (예: "성수동에서 만나는 힙한 예술 한 조각 코스")
    - 'tags' 배열 안의 아이템은 각 객체의 데이트 코스 분위기를 담은 단어로 3개
    - 'spots'는 코스당 3개, 서로 다른 장소
    - 'query' 작성 공식: 반드시 "[상세동명/랜드마크] + [장소 공식 명칭]" 조합으로 작성하고 반드시 현재(2026년 기준) 카카오맵에서 영업 중인 장소만 추천할 것.
      (예: "성수동 대림창고", "연남동 레이어드", "연성동 소산서원")
    - 'nameHint': 카카오맵에 등록된 실제 비즈니스 명칭을 정확히 적고 해당 장소의 정확한 카테고리를 괄호 안에 병기할 것. (예: "대림창고 (카페)")
    - 'spots': 반드시 실제로 영업 중인 장소여야 하며, 폐업했거나 가상의 장소는 절대 금지.
    - 'reason': 설레는 문체로, 해요체와 이모지를 풍부하게 사용해줘.
    - JSON 외 텍스트 절대 출력 금지
  `.trim();
}
