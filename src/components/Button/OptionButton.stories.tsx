import type { Meta, StoryObj } from "@storybook/react";
import { OptionButton } from "./OptionButton";

const meta: Meta<typeof OptionButton> = {
  title: "Components/OptionButton",
  component: OptionButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=7122-31366",
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["outline", "solid", "soft"] },
    state: {
      control: "inline-radio",
      options: ["default", "accent", "disabled"],
    },
  },
  args: { variant: "outline", state: "default", children: "text" },
};
export default meta;

type Story = StoryObj<typeof OptionButton>;

export const Outline: Story = { args: { variant: "outline" } };

export const Solid: Story = { args: { variant: "solid", state: "accent" } };

export const Soft: Story = { args: { variant: "soft" } };

/** outline — default / accent / disabled */
export const OutlineStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <OptionButton variant="outline" state="default">
        text
      </OptionButton>
      <OptionButton variant="outline" state="accent">
        text
      </OptionButton>
      <OptionButton variant="outline" state="disabled">
        text
      </OptionButton>
    </div>
  ),
};

/** solid — accent / disabled */
export const SolidStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <OptionButton variant="solid" state="accent">
        text
      </OptionButton>
      <OptionButton variant="solid" state="disabled">
        text
      </OptionButton>
    </div>
  ),
};
