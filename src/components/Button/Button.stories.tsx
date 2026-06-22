import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=1945-20216",
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary"] },
    size: { control: "inline-radio", options: ["lg", "md", "sm"] },
    state: {
      control: "inline-radio",
      options: ["enabled", "pressed", "disabled"],
    },
  },
  args: {
    variant: "primary",
    size: "md",
    state: "enabled",
    children: "Button",
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: "secondary" } };

/** 사이즈 — lg(56) / md(48) / sm(40) */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="lg">
        Button
      </Button>
      <Button {...args} size="md">
        Button
      </Button>
      <Button {...args} size="sm">
        Button
      </Button>
    </div>
  ),
};

/** 전체 매트릭스 — variant × state (md) */
export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["enabled", "pressed", "disabled"] as const).map((state) => (
        <div key={state} className="flex items-center gap-4">
          <span className="text-body3-regular text-fg-muted w-20">{state}</span>
          <Button variant="secondary" state={state}>
            Button
          </Button>
          <Button variant="primary" state={state}>
            Button
          </Button>
        </div>
      ))}
    </div>
  ),
};
