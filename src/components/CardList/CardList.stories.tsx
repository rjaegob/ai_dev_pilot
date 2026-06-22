import type { Meta, StoryObj } from "@storybook/react";
import { CardList, type CardListProps } from "./CardList";

const TITLE = "최대 두줄까지 타이틀 영역에 노출됩니다.최대 한줄까..";
const DESC = "설명문구는 최대 한줄까지만 노출됩니다.";
const ROWS = [
  { label: "라벨", content: "내용" },
  { label: "라벨", content: "내용" },
  { label: "라벨", content: "내용" },
  { label: "라벨", content: "내용" },
];

const CARD_W = "w-[506px]"; // token-exempt: 스토리 프리뷰 폭 (Figma 카드 506px 고정, 컴포넌트 자체는 w-full 가변)

const meta: Meta<typeof CardList> = {
  title: "Components/CardList",
  component: CardList,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=927-32296",
    },
  },
  argTypes: {
    progress: { control: { type: "range", min: 0, max: 100, step: 0.1 } },
    selectable: { control: "boolean" },
    checked: { control: "boolean" },
    showMore: { control: "boolean" },
  },
  args: {
    title: TITLE,
    description: DESC,
    selectable: true,
    checked: true,
    showMore: true,
  },
  decorators: [
    (Story, ctx) =>
      ctx.parameters.full ? (
        <Story />
      ) : (
        <div className={CARD_W}>
          <Story />
        </div>
      ),
  ],
};
export default meta;

type Story = StoryObj<typeof CardList>;

/** usage=default — 타이틀 + 설명만 (체크박스 off) */
export const Default: Story = {
  args: { selectable: false },
};

/** usage=default, row=2 — 라벨/내용 2행 */
export const WithRows: Story = {
  args: { rows: ROWS.slice(0, 2) },
};

/** usage=state — 상태 배지(성공/이용가능) */
export const State: Story = {
  args: {
    badges: [{ label: "이용가능", tone: "success", icon: "complete" }],
    rows: ROWS.slice(0, 3),
  },
};

/** usage=state — 위험(퇴사) 배지 */
export const StateDanger: Story = {
  args: {
    badges: [{ label: "퇴사", tone: "danger", icon: "error" }],
    rows: ROWS.slice(0, 1),
  },
};

/** usage=label — 라벨 칩(info/neutral) */
export const Label: Story = {
  args: {
    badges: [
      { label: "Release Ver.1", tone: "info" },
      { label: "Lastest.1", tone: "neutral" },
    ],
    rows: ROWS.slice(0, 3),
  },
};

/** usage=label — true/false 토글 칩 */
export const TrueFalse: Story = {
  args: {
    description: undefined,
    badges: [
      { label: "true", tone: "info" },
      { label: "false", tone: "neutral" },
    ],
    rows: ROWS.slice(0, 3),
  },
};

/** usage=progress — 진행률 바 + 상태 배지 */
export const Progress: Story = {
  args: {
    badges: [{ label: "이용가능", tone: "success", icon: "complete" }],
    progress: 84.3,
    rows: ROWS.slice(0, 2),
  },
};

/** row=4 — 최대 행 + 상태 배지 (더보기 off) */
export const MaxRows: Story = {
  args: {
    showMore: false,
    badges: [{ label: "이용가능", tone: "success", icon: "complete" }],
    rows: ROWS,
  },
};

/** Figma 프레임(927-32296) 전체 변형 매트릭스 재현 */
export const Showcase: Story = {
  parameters: { full: true },
  render: () => {
    const cards: CardListProps[] = [
      // ── 1행: default / 체크 + 행 수 증가 ──
      { title: TITLE, description: DESC, showMore: true },
      {
        title: TITLE,
        description: DESC,
        selectable: true,
        checked: true,
        showMore: true,
        rows: ROWS.slice(0, 2),
      },
      {
        title: TITLE,
        description: DESC,
        selectable: true,
        checked: true,
        showMore: true,
        rows: ROWS.slice(0, 3),
      },
      {
        title: TITLE,
        description: DESC,
        selectable: true,
        checked: true,
        showMore: true,
        rows: ROWS,
      },
      // ── 2행: state(danger/success) ──
      {
        title: TITLE,
        description: DESC,
        selectable: true,
        checked: true,
        showMore: true,
        badges: [{ label: "퇴사", tone: "danger", icon: "error" }],
        rows: ROWS.slice(0, 1),
      },
      {
        title: TITLE,
        description: DESC,
        selectable: true,
        checked: true,
        showMore: true,
        badges: [{ label: "퇴사", tone: "danger", icon: "error" }],
        rows: ROWS.slice(0, 2),
      },
      {
        title: TITLE,
        description: DESC,
        selectable: true,
        checked: true,
        showMore: true,
        badges: [{ label: "이용가능", tone: "success", icon: "complete" }],
        rows: ROWS.slice(0, 3),
      },
      {
        title: TITLE,
        description: DESC,
        selectable: true,
        checked: true,
        showMore: true,
        badges: [{ label: "이용가능", tone: "success", icon: "complete" }],
        rows: ROWS,
      },
      {
        title: TITLE,
        description: DESC,
        showMore: true,
        badges: [{ label: "이용가능", tone: "success", icon: "complete" }],
        rows: ROWS,
      },
      // ── 3행: label / true·false / progress ──
      {
        title: TITLE,
        selectable: true,
        checked: true,
        showMore: true,
        badges: [{ label: "Lastest.1", tone: "neutral" }],
        rows: ROWS.slice(0, 2),
      },
      {
        title: TITLE,
        description: DESC,
        selectable: true,
        checked: true,
        showMore: true,
        badges: [
          { label: "Release Ver.1", tone: "info" },
          { label: "Lastest.1", tone: "neutral" },
        ],
        rows: ROWS.slice(0, 3),
      },
      {
        title: TITLE,
        selectable: true,
        checked: true,
        showMore: true,
        badges: [
          { label: "true", tone: "info" },
          { label: "false", tone: "neutral" },
        ],
        rows: ROWS.slice(0, 3),
      },
      {
        title: TITLE,
        description: DESC,
        selectable: true,
        checked: true,
        showMore: true,
        badges: [{ label: "이용가능", tone: "success", icon: "complete" }],
        progress: 84.3,
        rows: ROWS.slice(0, 2),
      },
    ];
    return (
      <div className="flex flex-wrap items-start gap-6">
        {cards.map((props, i) => (
          <div key={i} className={CARD_W}>
            <CardList {...props} />
          </div>
        ))}
      </div>
    );
  },
};
