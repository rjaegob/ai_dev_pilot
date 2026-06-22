import type { Meta, StoryObj } from "@storybook/react";
import { TableHeaderCell } from "./TableHeaderCell";

const meta: Meta<typeof TableHeaderCell> = {
  title: "Components/Table/TableHeaderCell",
  component: TableHeaderCell,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/?node-id=323-20182",
    },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["text", "checkbox", "radio", "empty"],
    },
    arrow: { control: "inline-radio", options: ["none", "down", "up"] },
    align: { control: "inline-radio", options: ["left", "center"] },
    checked: { control: "boolean" },
  },
  args: { type: "text", label: "제목", arrow: "down", align: "left" },
};
export default meta;

type Story = StoryObj<typeof TableHeaderCell>;

/** text — 라벨 + 정렬 화살표(down), 좌측 정렬 */
export const Text: Story = {};

/** text — 화살표 up */
export const TextArrowUp: Story = { args: { arrow: "up" } };

/** text — 화살표 없음, 가운데 정렬 */
export const TextCenterNoArrow: Story = {
  args: { arrow: "none", align: "center" },
};

/** checkbox — 전체선택 헤더 */
export const CheckboxHeader: Story = {
  args: { type: "checkbox", align: "center" },
};

/** radio — 라디오 헤더 */
export const RadioHeader: Story = { args: { type: "radio", align: "center" } };

/** empty — 빈 헤더 */
export const EmptyHeader: Story = { args: { type: "empty", align: "center" } };

/** 전체 변형 매트릭스 */
export const AllVariants: Story = {
  render: () => (
    <div className="inline-flex flex-col">
      <TableHeaderCell type="text" label="제목" arrow="down" align="left" />
      <TableHeaderCell type="text" label="제목" arrow="up" align="left" />
      <TableHeaderCell type="text" label="제목" arrow="none" align="center" />
      <TableHeaderCell type="checkbox" align="center" />
      <TableHeaderCell type="radio" align="center" />
      <TableHeaderCell type="empty" align="center" />
    </div>
  ),
};
