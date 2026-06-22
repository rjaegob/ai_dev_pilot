import type { Meta, StoryObj } from "@storybook/react";
import { TableHeadCell } from "./TableHeadCell";

const meta: Meta<typeof TableHeadCell> = {
  title: "Components/Table/TableHeadCell",
  component: TableHeadCell,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/?node-id=327-23804",
    },
  },
  argTypes: {
    line: { control: "boolean" },
    align: { control: "inline-radio", options: ["left", "center"] },
    label: { control: "text" },
  },
  args: {
    label: "제목",
    line: true,
    align: "left",
  },
};
export default meta;

type Story = StoryObj<typeof TableHeadCell>;

/** 기본 — line on (우측 구분선) */
export const Default: Story = {};

/** line off — 마지막 컬럼 */
export const NoLine: Story = { args: { line: false } };

/** 가운데 정렬 */
export const Center: Story = { args: { align: "center" } };
