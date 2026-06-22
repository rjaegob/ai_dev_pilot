import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LnbRail, type LnbRailMenuItem } from "./LnbRail";

const meta: Meta<typeof LnbRail> = {
  title: "Components/Lnb/LnbRail",
  component: LnbRail,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=273-36843",
    },
  },
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof LnbRail>;

// Figma 273-36843 메뉴 (홈~관리). 배포=develop 아이콘.
const items: LnbRailMenuItem[] = [
  { value: "home", label: "홈", icon: "home" },
  { value: "data", label: "데이터", icon: "data" },
  { value: "model", label: "모델", icon: "model" },
  { value: "prompt", label: "프롬프트", icon: "prompt" },
  { value: "agent", label: "에이전트", icon: "agent" },
  { value: "assessment", label: "평가", icon: "assessment" },
  { value: "deployment", label: "배포", icon: "develop" },
  { value: "log", label: "로그", icon: "log" },
  { value: "notice", label: "공지사항", icon: "notice" },
  { value: "management", label: "관리", icon: "management" },
];

export const Default: Story = {
  args: { items, value: "home" },
};

/** 클릭 시 활성 항목이 바뀌는 동작 예시 */
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState("home");
    return <LnbRail {...args} value={value} onChange={setValue} />;
  },
  args: { items },
};
