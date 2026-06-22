import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FIGMA_BASE } from "./tokenStory.helpers";

/**
 * typography.tokens.css 의 합성 타이포 토큰(@utility text-*) 시각화.
 * 각 행은 클래스명 + 계산된 스펙(size/line-height/weight) + 샘플 텍스트.
 */
const meta: Meta = {
  title: "Tokens/Typography",
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: `${FIGMA_BASE}6642-26106` },
  },
};
export default meta;
type Story = StoryObj;

const GROUPS: { label: string; styles: string[] }[] = [
  {
    label: "Headline",
    styles: [
      "text-headline1-bold",
      "text-headline1-semibold",
      "text-headline2-product",
      "text-headline2-bold",
      "text-headline2-semibold",
    ],
  },
  {
    label: "Title",
    styles: [
      "text-title1-bold",
      "text-title1-semibold",
      "text-title2-bold",
      "text-title2-semibold",
      "text-title3-bold",
      "text-title3-semibold",
      "text-title4-bold",
      "text-title4-semibold",
    ],
  },
  {
    label: "Body",
    styles: [
      "text-body1-semibold",
      "text-body1-regular",
      "text-body2-semibold",
      "text-body2-medium",
      "text-body2-regular",
      "text-body3-semibold",
      "text-body3-regular",
    ],
  },
  {
    label: "Caption",
    styles: [
      "text-caption1-semibold",
      "text-caption1-regular",
      "text-caption2-semibold",
      "text-caption2-regular",
    ],
  },
];

function Row({ cls }: { cls: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [spec, setSpec] = useState("");
  useEffect(() => {
    if (!ref.current) return;
    const cs = getComputedStyle(ref.current);
    setSpec(`${cs.fontSize} / ${cs.lineHeight} · ${cs.fontWeight}`);
  }, []);
  return (
    <div className="flex flex-col gap-1 border-b border-border pb-4">
      <div className="flex items-baseline justify-between gap-4">
        <code className="text-caption2-semibold text-fg">{cls}</code>
        <code className="text-caption2-regular text-fg-muted">{spec}</code>
      </div>
      <p ref={ref} className={`${cls} text-fg`}>
        프로젝트 상태를 빠르게 확인합니다 Sphinx 0123
      </p>
    </div>
  );
}

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-8 bg-bg p-8">
      {GROUPS.map((g) => (
        <section key={g.label} className="flex flex-col gap-4">
          <h3 className="text-title4-semibold text-fg-muted">{g.label}</h3>
          {g.styles.map((s) => (
            <Row key={s} cls={s} />
          ))}
        </section>
      ))}
    </div>
  ),
};
