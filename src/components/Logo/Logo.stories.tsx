import type { Meta, StoryObj } from "@storybook/react";
import { Logo, LOGO_NAMES } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Foundation/Logo",
  component: Logo,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=6672-20042",
    },
  },
  argTypes: {
    name: { control: "select", options: LOGO_NAMES },
    size: { control: "inline-radio", options: [16, 24, 32] },
  },
  args: { name: "shinhan", size: 24 },
};
export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

/** 신한 로고 — 표준 해상도 16 / 24 / 32 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <Logo name="shinhan" size={16} />
      <Logo name="shinhan" size={24} />
      <Logo name="shinhan" size={32} />
    </div>
  ),
};

/** 신한은행 CI 시그니처 (가로 lockup) — 높이만 size 로 고정, 폭 비율 자동 */
export const Signature: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/gq7VSXzSwt6uvUBwdjF8yT/%EA%B3%B5%EC%9C%A0_%ED%99%94%EB%A9%B4%EB%AA%A8%EC%9D%8C?node-id=8088-21350",
    },
  },
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <Logo name="shinhan-signature" size={16} />
      <Logo name="shinhan-signature" size={24} />
      <Logo name="shinhan-signature" size={32} />
    </div>
  ),
};

/** 전체 로고 세트 (24) */
export const AllLogos: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {LOGO_NAMES.map((name) => (
        <Logo key={name} name={name} size={24} />
      ))}
    </div>
  ),
};
