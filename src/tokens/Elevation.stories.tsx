import type { Meta, StoryObj } from "@storybook/react";
import { FIGMA_BASE, useRootVar } from "./tokenStory.helpers";

/**
 * effects.tokens.css 의 드롭 섀도우 토큰(--shadow-1..4) 시각화.
 * 콘텐츠 위계: 1(콘텐츠 박스) → 2(기본 카드) → 3(팝업/보조) → 4(강조 카드).
 */
const meta: Meta = {
  title: "Tokens/Elevation",
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: `${FIGMA_BASE}6642-47599` },
  },
};
export default meta;
type Story = StoryObj;

const SHADOWS: { name: string; use: string }[] = [
  { name: "--shadow-1", use: "Contents_main · 서브페이지 콘텐츠 박스" },
  { name: "--shadow-2", use: "Card_main · 기본 카드" },
  { name: "--shadow-3", use: "Card_sub · 팝업·보조 카드" },
  { name: "--shadow-4", use: "Card_contents · 강조 카드" },
  { name: "--shadow-segment", use: "SegmentTab · 활성 칩" },
];

function Card({ name, use }: { name: string; use: string }) {
  const value = useRootVar(name);
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="size-32 rounded-lg bg-bg"
        style={{ boxShadow: `var(${name})` }}
      />
      <code className="text-body3-semibold text-fg">{name}</code>
      <code className="text-caption2-regular text-fg-muted">{value}</code>
      <p className="text-caption2-regular text-fg-muted text-center">{use}</p>
    </div>
  );
}

export const All: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10 bg-surface p-12">
      {SHADOWS.map((s) => (
        <Card key={s.name} name={s.name} use={s.use} />
      ))}
    </div>
  ),
};
