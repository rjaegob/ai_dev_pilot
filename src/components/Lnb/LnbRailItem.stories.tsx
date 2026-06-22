import type { Meta, StoryObj } from "@storybook/react";
import { LnbRailItem } from "./LnbRailItem";

const meta: Meta<typeof LnbRailItem> = {
  title: "Components/Lnb/LnbRailItem",
  component: LnbRailItem,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=273-36847",
    },
  },
  argTypes: { active: { control: "boolean" } },
  args: { children: "홈", icon: "home", active: true },
  decorators: [
    (Story) => (
      <div className="w-18">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof LnbRailItem>;

export const Active: Story = { args: { active: true } };

export const Inactive: Story = {
  args: { active: false, children: "데이터", icon: "data" },
};
