import type { Meta, StoryObj } from "@storybook/react";
import { TextButton } from "./TextButton";

const meta: Meta<typeof TextButton> = {
  title: "Components/TextButton",
  component: TextButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/?node-id=2250-3793",
    },
  },
  argTypes: {
    icon: { control: "text" },
    disabled: { control: "boolean" },
    onClick: { action: "click" },
  },
  args: {
    children: "코드 확인하기",
  },
};
export default meta;

type Story = StoryObj<typeof TextButton>;

/** 기본 — 텍스트만 (밑줄 + primary-800) */
export const Default: Story = {};

/** 후행 export 아이콘 — Figma 프레임 예시 */
export const WithIcon: Story = {
  args: { children: "코드 확인하기", icon: "export" },
};

/** disabled */
export const Disabled: Story = {
  args: { children: "코드 확인하기", icon: "export", disabled: true },
};
