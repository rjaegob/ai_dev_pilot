import type { Meta, StoryObj } from "@storybook/react";
import { NodeButton } from "./NodeButton";

const meta: Meta<typeof NodeButton> = {
  title: "Components/NodeButton",
  component: NodeButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=1206-39478",
    },
  },
  argTypes: {
    state: { control: "inline-radio", options: ["default", "disabled"] },
    icon: { control: "text" },
  },
  args: { state: "default", icon: "note", children: "Note" },
};
export default meta;

type Story = StoryObj<typeof NodeButton>;

export const Default: Story = {};

export const Disabled: Story = { args: { state: "disabled" } };

/** 상태 — default / disabled */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <NodeButton state="default">Note</NodeButton>
      <NodeButton state="disabled">Note</NodeButton>
    </div>
  ),
};
