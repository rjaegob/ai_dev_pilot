import type { Meta, StoryObj } from "@storybook/react";
import { Header, type HeaderType } from "./Header";

const FILE = "lhY9RZGmQGc4b97BJaemoJ";
const figmaUrl = (nodeId: string) =>
  `https://www.figma.com/design/${FILE}/%EA%B3%B5%EC%9C%A0_Design-Style-Guide?node-id=${nodeId}`;

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: figmaUrl("164-27063") },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: [
        "pc_login",
        "pcMainOn",
        "pcMainOff",
        "pcMainNopublic",
        "pcMainDisabled",
        "devmode",
      ] satisfies HeaderType[],
    },
    breadcrumb: { control: "object" },
    projectName: { control: "text" },
    userInitial: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Header>;

export const PcLogin: Story = {
  args: { type: "pc_login" },
  parameters: { design: { type: "figma", url: figmaUrl("164-27062") } },
};

export const PcMainOn: Story = {
  args: { type: "pcMainOn" },
  parameters: { design: { type: "figma", url: figmaUrl("164-26881") } },
};

export const PcMainOff: Story = {
  args: { type: "pcMainOff" },
  parameters: { design: { type: "figma", url: figmaUrl("4275-37230") } },
};

export const PcMainNopublic: Story = {
  args: { type: "pcMainNopublic" },
  parameters: { design: { type: "figma", url: figmaUrl("6367-13684") } },
};

export const PcMainDisabled: Story = {
  args: { type: "pcMainDisabled" },
  parameters: { design: { type: "figma", url: figmaUrl("4042-15267") } },
};

export const Devmode: Story = {
  args: { type: "devmode" },
  parameters: { design: { type: "figma", url: figmaUrl("2647-29004") } },
};
