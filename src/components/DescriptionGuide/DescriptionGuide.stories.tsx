import type { Meta, StoryObj } from "@storybook/react";
import { DescriptionGuide, type DescriptionRow } from "./DescriptionGuide";
import screenLG010102 from "./assets/LG_010102.png";

const meta: Meta<typeof DescriptionGuide> = {
  title: "Templates/DescriptionGuide",
  component: DescriptionGuide,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/fYvi8OPfF4d7EWRovK1Gsc/?node-id=40000001-45113",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        {/* 산출물 보드 기준 폭 (--dg-board-w) */}
        <div style={{ width: "var(--dg-board-w)" }}>
          <Story />
        </div>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DescriptionGuide>;

/** 데모 화면(LG_010102) 이미지를 화면 슬롯에 넣고 마커를 오버레이한다. */
const SCREEN = (
  <img src={screenLG010102} alt="회원가입 완료 화면" className="block w-full" />
);

/** 입력받은 설명 내용 → Description 행. 좌측 마커(no)와 1:1 매핑. */
const ROWS: DescriptionRow[] = [
  {
    no: "01",
    target: "[Alert] 회원가입 완료",
    sections: [
      {
        heading: "1. 노출 조건",
        lines: ["- 회원가입 컨펌 내 [예] 버튼 클릭 시"],
      },
      {
        heading: "2. 출력 정보",
        lines: ["- 입력한 행번의 이름 출력"],
      },
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

/** LG_010102 회원가입 완료 — 화면 + 지시번호 + Description 산출물. */
export const LG_010102: Story = {
  args: {
    meta: {
      screenName: "완료",
      screenId: "LG_010102",
      screenType: "React",
      location: "로그인 > 완료",
      division: "Page",
    },
    screen: SCREEN,
    // 마커 ①: "회원가입 완료" 텍스트 / ②: "확인" 버튼
    markers: [
      { no: 1, x: "44%", y: "37%" },
      { no: 2, x: "45.5%", y: "69.5%" },
    ],
    rows: ROWS,
  },
};
