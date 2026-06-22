import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=128-82321",
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["input", "search"] },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
  args: { variant: "input", placeholder: "필드명 입력" },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Input: Story = {};

export const Search: Story = {
  args: { variant: "search", placeholder: "검색어 입력" },
};

/** 값이 입력된 상태 — clear(x) 버튼 노출 */
export const Filled: Story = {
  args: { defaultValue: "텍스트 입력완료" },
};

export const Error: Story = {
  args: {
    defaultValue: "텍스트 입력완료",
    error: true,
    errorMessage: "오류 메세지 노출",
  },
};

export const Disabled: Story = {
  args: { defaultValue: "텍스트 입력완료", disabled: true },
};

export const ReadOnly: Story = {
  args: { defaultValue: "텍스트 입력완료", readOnly: true },
};

/** input × 상태 매트릭스 */
export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField placeholder="필드명 입력" />
      <TextField defaultValue="텍스트 입력완료" />
      <TextField
        defaultValue="텍스트 입력완료"
        error
        errorMessage="오류 메세지 노출"
      />
      <TextField defaultValue="텍스트 입력완료" disabled />
      <TextField defaultValue="텍스트 입력완료" readOnly />
      <TextField variant="search" placeholder="검색어 입력" />
      <TextField variant="search" defaultValue="검색어 입력완료" />
    </div>
  ),
};
