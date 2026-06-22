import type { Meta, StoryObj } from "@storybook/react";
import { TableDataCell } from "./TableDataCell";
import { Label } from "../Label";
import { TextButton } from "../TextButton";

const meta: Meta<typeof TableDataCell> = {
  title: "Components/Table/TableDataCell",
  component: TableDataCell,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/?node-id=331-19408",
    },
  },
  argTypes: {
    line: { control: "boolean" },
    align: { control: "inline-radio", options: ["left", "center"] },
  },
  args: {
    line: false,
    align: "left",
  },
};
export default meta;

type Story = StoryObj<typeof TableDataCell>;

/** 텍스트 콘텐츠 — fg-muted + body2 */
export const Text: Story = {
  args: { children: "내용내용내용내용" },
};

/** 텍스트 + line on (우측 구분선) */
export const TextWithLine: Story = {
  args: { children: "내용내용내용내용", line: true },
};

/** Label 슬롯 — 재사용 컴포넌트 <Label color="blue"> */
export const WithLabel: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/?node-id=2250-3787",
    },
  },
  render: (args) => (
    <TableDataCell {...args}>
      <Label color="blue">완료</Label>
    </TableDataCell>
  ),
};

/** TextButton 슬롯 — 재사용 컴포넌트 <TextButton icon="export"> */
export const WithTextButton: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/?node-id=2250-3793",
    },
  },
  render: (args) => (
    <TableDataCell {...args}>
      <TextButton icon="export">코드 확인하기</TextButton>
    </TableDataCell>
  ),
};
