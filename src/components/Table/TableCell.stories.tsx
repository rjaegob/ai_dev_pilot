import type { Meta, StoryObj } from "@storybook/react";
import { TableCell, type TableCellType } from "./TableCell";

const meta: Meta<typeof TableCell> = {
  title: "Components/Table/TableCell",
  component: TableCell,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/?node-id=323-28651",
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: [
        "contents",
        "toggle",
        "checkbox",
        "radio",
        "overflow",
        "tag",
        "txtbtn",
      ],
    },
    state: { control: "inline-radio", options: ["default", "hover"] },
    bg: { control: "inline-radio", options: ["on", "off"] },
    align: { control: "inline-radio", options: ["left", "center"] },
    number: { control: "inline-radio", options: ["on", "off"] },
  },
  args: {
    type: "contents",
    state: "default",
    bg: "on",
    align: "left",
    number: "off",
  },
};
export default meta;

type Story = StoryObj<typeof TableCell>;

/** contents — 텍스트 "내용" */
export const Contents: Story = {};

/** contents — number=on → "1" */
export const ContentsNumber: Story = { args: { number: "on" } };

/** toggle */
export const ToggleCell: Story = { args: { type: "toggle", align: "center" } };

/** checkbox */
export const CheckboxCell: Story = {
  args: { type: "checkbox", align: "center" },
};

/** radio */
export const RadioCell: Story = { args: { type: "radio", align: "center" } };

/** overflow — ⋮ 아이콘 버튼 */
export const OverflowCell: Story = {
  args: { type: "overflow", align: "center" },
};

/** tag — 회색 pill 라벨 */
export const TagCell: Story = { args: { type: "tag", number: "on" } };

/** txtbtn — Text Button (밑줄 + primary) */
export const TextButtonCell: Story = {
  args: { type: "txtbtn", number: "on" },
};

/** hover 상태 (bg on) — primary surface 배경 */
export const ContentsHover: Story = { args: { state: "hover" } };

/** bg off (white) default */
export const ContentsBgOff: Story = { args: { bg: "off" } };

const ALL_TYPES: TableCellType[] = [
  "contents",
  "toggle",
  "checkbox",
  "radio",
  "overflow",
  "tag",
  "txtbtn",
];

/** 전체 type × state(default/hover) 매트릭스 (bg on) */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["default", "hover"] as const).map((state) => (
        <div key={state} className="flex flex-col gap-2">
          <span className="text-body2-semibold text-fg">{state}</span>
          <div className="inline-flex flex-wrap items-start gap-3">
            {ALL_TYPES.map((type) => (
              <TableCell
                key={type}
                type={type}
                state={state}
                bg="on"
                align={
                  ["toggle", "checkbox", "radio", "overflow"].includes(type)
                    ? "center"
                    : "left"
                }
                number={["tag", "txtbtn"].includes(type) ? "on" : "off"}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
