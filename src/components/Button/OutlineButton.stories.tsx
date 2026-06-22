import type { Meta, StoryObj } from "@storybook/react";
import { OutlineButton } from "./OutlineButton";

const meta: Meta<typeof OutlineButton> = {
  title: "Components/OutlineButton",
  component: OutlineButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=1138-18448",
    },
  },
  argTypes: {
    state: {
      control: "inline-radio",
      options: ["default", "accent", "disabled"],
    },
    icon: { control: "text" },
  },
  args: { state: "default", children: "Button" },
};
export default meta;

type Story = StoryObj<typeof OutlineButton>;

export const Default: Story = {};

export const Accent: Story = { args: { state: "accent" } };

export const Disabled: Story = { args: { state: "disabled" } };

/** 상태 — default / accent / disabled */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <OutlineButton state="default">Button</OutlineButton>
      <OutlineButton state="accent">Button</OutlineButton>
      <OutlineButton state="disabled">Button</OutlineButton>
    </div>
  ),
};

/** 아이콘 변형 — download (accent / disabled) */
export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <OutlineButton state="accent" icon="download">
        Button
      </OutlineButton>
      <OutlineButton state="disabled" icon="download">
        Button
      </OutlineButton>
    </div>
  ),
};
