import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=7122-31365",
    },
  },
  argTypes: {
    icon: { control: "text" },
    state: {
      control: "inline-radio",
      options: ["default", "active", "inactive"],
    },
  },
  args: { icon: "minus", state: "default", label: "Decrease" },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Minus: Story = { args: { icon: "minus", label: "Decrease" } };

export const Plus: Story = { args: { icon: "add", label: "Increase" } };

/** minus — default / active / inactive */
export const MinusStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon="minus" state="default" label="Decrease" />
      <IconButton icon="minus" state="active" label="Decrease" />
      <IconButton icon="minus" state="inactive" label="Decrease" />
    </div>
  ),
};

/** plus — default / active / inactive */
export const PlusStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon="add" state="default" label="Increase" />
      <IconButton icon="add" state="active" label="Increase" />
      <IconButton icon="add" state="inactive" label="Increase" />
    </div>
  ),
};
