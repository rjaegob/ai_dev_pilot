import type { Meta, StoryObj } from "@storybook/react";
import { Label, type LabelColor } from "./Label";

const COLORS: LabelColor[] = [
  "gray",
  "red",
  "blue",
  "yellow",
  "purple",
  "orange",
  "green",
];

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=156-23455",
    },
  },
  argTypes: {
    color: { control: "inline-radio", options: COLORS },
    hideIcon: { control: "boolean" },
    children: { control: "text" },
  },
  args: { color: "gray", children: "레이블", hideIcon: false },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Playground: Story = {};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {COLORS.map((color) => (
        <Label key={color} color={color}>
          {color}
        </Label>
      ))}
    </div>
  ),
};

export const NoIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {COLORS.map((color) => (
        <Label key={color} color={color} hideIcon>
          {color}
        </Label>
      ))}
    </div>
  ),
};
