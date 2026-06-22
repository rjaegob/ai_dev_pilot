import {
  DescriptionGuide,
  type DescriptionRow,
} from "../../components/DescriptionGuide/DescriptionGuide";
import screenLG010102 from "../../components/DescriptionGuide/assets/LG_010102.png";

/** 좌측 화면 목업 (이미지 슬롯). */
const SCREEN = (
  <img src={screenLG010102} alt="회원가입 완료 화면" className="block w-full" />
);

/** Description 행 — 좌측 마커(no)와 1:1 매핑. */
const ROWS: DescriptionRow[] = [
  {
    no: "01",
    target: "[Alert] 회원가입 완료",
    sections: [
      {
        heading: "1. 노출 조건",
        lines: ["- 회원가입 컨펌 내 [예] 버튼 클릭 시"],
      },
      { heading: "2. 출력 정보", lines: ["- 입력한 행번의 이름 출력"] },
      {
        heading: "3. 저장 정보",
        lines: [
          "- 회원 테이블에 가입한 사용자 정보 저장",
          "1) 이름",
          "2) 인사 상태",
          "3) 부서",
          "4) 직급",
          "5) 행번",
        ],
      },
    ],
  },
  {
    no: "02",
    target: "[확인] 버튼",
    sections: [
      {
        heading: "1. 클릭 시",
        lines: ["- 로그인 유효시간 1시간 부여", "- 가이드 화면 이동"],
      },
    ],
  },
];

/** /Template — 디스크립션 가이드 산출물(LG_010102)을 웹에서 바로 확인하는 페이지. */
export function Template() {
  return (
    <main
      className="min-h-screen p-8 font-sans"
      style={{ backgroundColor: "var(--color-neutral-0)" }}
    >
      <DescriptionGuide
        meta={{
          screenName: "완료",
          screenId: "LG_010102",
          screenType: "React",
          location: "로그인 > 완료",
          division: "Page",
        }}
        screen={SCREEN}
        markers={[
          { no: 1, x: "44%", y: "37%" },
          { no: 2, x: "45.5%", y: "69.5%" },
        ]}
        rows={ROWS}
        ratio={[7, 3]}
      />
    </main>
  );
}
