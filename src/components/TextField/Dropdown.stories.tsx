import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";

const OPTIONS = [
  { label: "Selected 항목", value: "a" },
  { label: "Hover 항목", value: "b" },
  { label: "선택항목 3", value: "c" },
  { label: "선택항목 4", value: "d" },
  { label: "선택항목 5", value: "e" },
  { label: "선택항목 6", value: "f" },
];

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=128-78965",
    },
  },
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
  args: { options: OPTIONS, placeholder: "플레이스 홀더" },
  decorators: [
    (Story) => (
      <div className="max-w-sm pb-64">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {};

export const Selected: Story = {
  args: { defaultValue: "a" },
};

export const Error: Story = {
  args: { error: true, errorMessage: "오류 메세지 노출" },
};

export const Disabled: Story = {
  args: { defaultValue: "a", disabled: true },
};

export const ReadOnly: Story = {
  args: { defaultValue: "a", readOnly: true },
};
