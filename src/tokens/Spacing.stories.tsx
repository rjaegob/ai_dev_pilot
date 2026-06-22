import type { Meta, StoryObj } from "@storybook/react";
import { FIGMA_BASE, useRootVar } from "./tokenStory.helpers";

/**
 * 스페이싱 시각화.
 *  - Scale: Tailwind v4 기본 --spacing 스케일 → p-1/gap-2/… 유틸과 정합.
 *  - Layout: layout.tokens.css 의 고정 영역 폭·간격(--layout-*).
 */
const meta: Meta = {
  title: "Tokens/Spacing",
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: `${FIGMA_BASE}6642-26836` },
  },
};
export default meta;
type Story = StoryObj;

/** Tailwind 스페이싱 스케일 스텝(= --spacing 배수). */
const SCALE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];

const LAYOUT: string[] = [
  "--layout-header-h",
  "--layout-lnb-w",
  "--layout-lnb-2depth-w",
  "--layout-lnb-rail-w",
  "--layout-lnb-max-w",
  "--layout-filter-w",
  "--layout-filter-alt-w",
  "--layout-step-w",
  "--layout-modal-lg-w",
  "--layout-col-gap",
  "--layout-content-inset-y",
  "--layout-content-w",
];

function ScaleRow({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-4">
      <code className="text-body3-regular text-fg w-12">{step}</code>
      <code className="text-caption2-regular text-fg-muted w-16">p-{step}</code>
      <div
        className="h-4 rounded-sm bg-primary"
        style={{ width: `calc(var(--spacing) * ${step})` }}
      />
    </div>
  );
}

function LayoutRow({ name }: { name: string }) {
  const value = useRootVar(name);
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2">
      <code className="text-body3-regular text-fg">{name}</code>
      <code className="text-caption2-regular text-fg-muted">{value}</code>
    </div>
  );
}

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-3 bg-bg p-8">
      <h3 className="text-title4-semibold text-fg">
        Spacing Scale · --spacing × n
      </h3>
      {SCALE.map((s) => (
        <ScaleRow key={s} step={s} />
      ))}
    </div>
  ),
};

export const Layout: Story = {
  render: () => (
    <div className="flex flex-col gap-3 bg-bg p-8">
      <h3 className="text-title4-semibold text-fg">
        Layout Tokens · --layout-*
      </h3>
      <div className="flex w-full max-w-xl flex-col">
        {LAYOUT.map((t) => (
          <LayoutRow key={t} name={t} />
        ))}
      </div>
    </div>
  ),
};
