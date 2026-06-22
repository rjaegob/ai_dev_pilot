import type { Meta, StoryObj } from "@storybook/react";
import { LnbItem } from "./LnbItem";

const meta: Meta<typeof LnbItem> = {
  title: "Components/Lnb/LnbItem",
  component: LnbItem,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=273-58432",
    },
  },
  argTypes: { active: { control: "boolean" } },
  args: { children: "대시보드", icon: "home-dashboard", active: true },
  decorators: [
    (Story) => (
      <div className="w-50 px-2">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof LnbItem>;

export const Active: Story = { args: { active: true } };

export const Inactive: Story = {
  args: { active: false, children: "데이터 저장소", icon: "data-storage" },
};
