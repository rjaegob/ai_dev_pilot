import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Lnb, type LnbSection } from "./Lnb";

const meta: Meta<typeof Lnb> = {
  title: "Components/Lnb/Lnb",
  component: Lnb,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=273-50101",
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

type Story = StoryObj<typeof Lnb>;

// Figma 273-58432 (home/dashboard) 상태 재현
const sections: LnbSection[] = [
  {
    label: "홈",
    items: [{ value: "dashboard", label: "대시보드", icon: "home-dashboard" }],
  },
  {
    label: "최근 이용 메뉴",
    items: [
      { value: "model-deploy", label: "모델 배포", icon: "model-deployment" },
      { value: "notice", label: "공지사항", icon: "notice" },
      { value: "data-storage", label: "데이터 저장소", icon: "data-storage" },
      { value: "data-catalog", label: "데이터 카탈로그", icon: "data-catalog" },
    ],
  },
];

export const Default: Story = {
  args: { sections, value: "dashboard" },
};

/** 클릭 시 활성 항목이 바뀌는 동작 예시 */
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState("dashboard");
    return <Lnb {...args} value={value} onChange={setValue} />;
  },
  args: { sections },
};
