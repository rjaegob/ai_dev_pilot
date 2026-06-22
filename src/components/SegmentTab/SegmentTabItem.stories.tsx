import type { Meta, StoryObj } from "@storybook/react";
import { SegmentTabItem } from "./SegmentTabItem";

const meta: Meta<typeof SegmentTabItem> = {
  title: "Components/SegmentTab/SegmentTabItem",
  component: SegmentTabItem,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=6746-14572",
    },
  },
  argTypes: { active: { control: "boolean" } },
  args: { children: "항목명", active: true },
  decorators: [
    (Story) => (
      <div className="flex w-40">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SegmentTabItem>;

export const Active: Story = { args: { active: true } };

export const Inactive: Story = { args: { active: false } };
