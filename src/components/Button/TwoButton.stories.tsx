import type { Meta, StoryObj } from "@storybook/react";
import { TwoButton } from "./TwoButton";

const meta: Meta<typeof TwoButton> = {
  title: "Components/TwoButton",
  component: TwoButton,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=1945-20216",
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["lg", "md", "sm"] },
    state: {
      control: "inline-radio",
      options: ["enabled", "pressed", "disabled"],
    },
  },
  args: { size: "md", state: "enabled" },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TwoButton>;

export const Default: Story = {};

/** 사이즈별 — lg / md / sm */
export const Sizes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-4">
      <TwoButton size="lg" />
      <TwoButton size="md" />
      <TwoButton size="sm" />
    </div>
  ),
};

/** 상태별 — enabled / pressed / disabled */
export const States: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-4">
      <TwoButton state="enabled" />
      <TwoButton state="pressed" />
      <TwoButton state="disabled" />
    </div>
  ),
};
