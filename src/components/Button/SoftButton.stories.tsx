import type { Meta, StoryObj } from "@storybook/react";
import { SoftButton } from "./SoftButton";

const meta: Meta<typeof SoftButton> = {
  title: "Components/SoftButton",
  component: SoftButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=1884-19858",
    },
  },
  args: { children: "Button" },
};
export default meta;

type Story = StoryObj<typeof SoftButton>;

export const Default: Story = {};
