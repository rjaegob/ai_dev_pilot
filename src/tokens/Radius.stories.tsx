import type { Meta, StoryObj } from "@storybook/react";
import { FIGMA_BASE, useRootVar } from "./tokenStory.helpers";

/**
 * effects.tokens.css 의 라디우스 토큰(--radius-*) 시각화.
 */
const meta: Meta = {
  title: "Tokens/Radius",
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: `${FIGMA_BASE}6642-47599` },
  },
};
export default meta;
type Story = StoryObj;

const RADII: { name: string; use: string }[] = [
  { name: "--radius-xs", use: "옵션/토글 칩" },
  { name: "--radius-sm", use: "소형 버튼" },
  { name: "--radius-md", use: "버튼·작은 카드" },
  { name: "--radius-lg", use: "기본 카드·셰이프" },
  { name: "--radius-xl", use: "바텀시트·메인카드" },
  { name: "--radius-full", use: "pill·원형" },
];

function Box({ name, use }: { name: string; use: string }) {
  const value = useRootVar(name);
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="size-24 border border-border bg-primary"
        style={{ borderRadius: `var(${name})` }}
      />
      <code className="text-body3-semibold text-fg">{name}</code>
      <code className="text-caption2-regular text-fg-muted">{value}</code>
      <p className="text-caption2-regular text-fg-muted text-center">{use}</p>
    </div>
  );
}

export const All: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10 bg-bg p-12">
      {RADII.map((r) => (
        <Box key={r.name} name={r.name} use={r.use} />
      ))}
    </div>
  ),
};
