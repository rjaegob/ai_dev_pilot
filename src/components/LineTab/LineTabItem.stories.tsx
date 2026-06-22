import type { Meta, StoryObj } from "@storybook/react";
import { LineTabItem } from "./LineTabItem";

const meta: Meta<typeof LineTabItem> = {
  title: "Components/LineTab/LineTabItem",
  component: LineTabItem,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=325-26825",
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["l", "m"] },
    selected: { control: "boolean" },
  },
  args: { children: "항목명", size: "l", selected: true },
};
export default meta;

type Story = StoryObj<typeof LineTabItem>;

export const LargeOn: Story = { args: { size: "l", selected: true } };
export const LargeOff: Story = { args: { size: "l", selected: false } };
export const MediumOn: Story = { args: { size: "m", selected: true } };
export const MediumOff: Story = { args: { size: "m", selected: false } };
