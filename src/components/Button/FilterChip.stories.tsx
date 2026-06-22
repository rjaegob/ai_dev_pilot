import type { Meta, StoryObj } from "@storybook/react";
import { FilterChip } from "./FilterChip";

const meta: Meta<typeof FilterChip> = {
  title: "Components/FilterChip",
  component: FilterChip,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=346-24483",
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["icon", "chip"] },
    icon: { control: "text" },
  },
  args: { variant: "chip", children: "필터명" },
};
export default meta;

type Story = StoryObj<typeof FilterChip>;

export const Chip: Story = { args: { variant: "chip", children: "필터명" } };

export const IconOnly: Story = {
  args: { variant: "icon", icon: "sort", label: "정렬" },
};

/** 전체 — 아이콘 / 칩 / 아이콘 */
export const All: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <FilterChip variant="icon" icon="sort" label="정렬" />
      <FilterChip variant="chip">필터명</FilterChip>
      <FilterChip variant="icon" icon="align" label="필터" />
    </div>
  ),
};
