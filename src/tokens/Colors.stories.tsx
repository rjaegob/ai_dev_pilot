import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FIGMA_BASE, useRootVar } from "./tokenStory.helpers";

/**
 * colors.tokens.css 의 컬러 토큰 시각화.
 * Primitive(값 기반, 참조 전용) → Semantic(역할 기반, Tailwind 유틸 생성) 순서.
 */
const meta: Meta = {
  title: "Tokens/Colors",
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: `${FIGMA_BASE}6642-26084` },
  },
};
export default meta;
type Story = StoryObj;

const PRIMITIVE: { label: string; tokens: string[] }[] = [
  { label: "Brand", tokens: ["--color-brand-shinhan-blue"] },
  {
    label: "Primary",
    tokens: [
      "--color-primary-100",
      "--color-primary-200",
      "--color-primary-300",
      "--color-primary-400",
      "--color-primary-500",
      "--color-primary-600",
      "--color-primary-700",
      "--color-primary-800",
      "--color-primary-900",
    ],
  },
  {
    label: "Greyscale",
    tokens: [
      "--color-greyscale-200",
      "--color-greyscale-300",
      "--color-greyscale-400",
      "--color-greyscale-500",
      "--color-greyscale-550",
      "--color-greyscale-600",
      "--color-greyscale-700",
      "--color-greyscale-800",
      "--color-greyscale-900",
    ],
  },
  {
    label: "Neutral",
    tokens: ["--color-neutral-0", "--color-neutral-100", "--color-neutral-550"],
  },
  {
    label: "Grey",
    tokens: ["--color-grey-600", "--color-grey-800", "--color-grey-900"],
  },
  { label: "State", tokens: ["--color-state-red", "--color-state-green"] },
  {
    label: "Label",
    tokens: [
      "--color-label-purple-deep",
      "--color-label-purple-mid",
      "--color-label-green-deep",
      "--color-label-green-mid",
      "--color-label-red-deep",
      "--color-label-red-mid",
      "--color-label-orange-deep",
      "--color-label-orange-mid",
      "--color-label-orange-light",
      "--color-label-orange-yellow",
      "--color-label-neutral-deep",
      "--color-label-neutral-light-gray",
    ],
  },
  {
    label: "Gauge",
    tokens: [
      "--color-gauge-blue",
      "--color-gauge-green",
      "--color-gauge-purple",
    ],
  },
  { label: "Text / Dimmed", tokens: ["--color-text-white", "--color-dim"] },
];

const SEMANTIC: string[] = [
  "--color-primary",
  "--color-primary-hover",
  "--color-secondary",
  "--color-bg",
  "--color-surface",
  "--color-border",
  "--color-fg",
  "--color-fg-muted",
  "--color-on-primary",
  "--color-danger",
  "--color-success",
  "--color-overlay",
];

function Swatch({ name }: { name: string }) {
  const value = useRootVar(name);
  const swatchStyle = {
    "--swatch-color": `var(${name})`,
  } as CSSProperties;

  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-16 w-full rounded-md border border-border bg-[var(--swatch-color)]"
        style={swatchStyle}
      />
      <code className="text-body3-regular text-fg">{name}</code>
      <code className="text-caption2-regular text-fg-muted uppercase">
        {value}
      </code>
    </div>
  );
}

function Section({ label, tokens }: { label: string; tokens: string[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-title4-semibold text-fg">{label}</h3>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {tokens.map((t) => (
          <Swatch key={t} name={t} />
        ))}
      </div>
    </section>
  );
}

export const Primitive: Story = {
  render: () => (
    <div className="flex flex-col gap-8 bg-bg p-8">
      {PRIMITIVE.map((g) => (
        <Section key={g.label} label={g.label} tokens={g.tokens} />
      ))}
    </div>
  ),
};

export const Semantic: Story = {
  render: () => (
    <div className="flex flex-col gap-3 bg-bg p-8">
      <Section
        label="Semantic (역할 기반 · Tailwind 유틸 생성)"
        tokens={SEMANTIC}
      />
    </div>
  ),
};
