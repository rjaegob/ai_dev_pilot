import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LineTab } from "./LineTab";

const meta: Meta<typeof LineTab> = {
  title: "Components/LineTab/LineTab",
  component: LineTab,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=325-26806",
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["l", "m"] },
    value: { control: { type: "number", min: 0 } },
  },
  args: { items: ["항목명", "항목명", "항목명"], size: "l", value: 0 },
};
export default meta;

type Story = StoryObj<typeof LineTab>;

export const Large: Story = { args: { size: "l" } };

export const Medium: Story = { args: { size: "m" } };

/** segments 2~5 (Large) */
export const LargeSegments: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      <LineTab {...args} items={["항목명", "항목명"]} />
      <LineTab {...args} items={["항목명", "항목명", "항목명"]} />
      <LineTab {...args} items={["항목명", "항목명", "항목명", "항목명"]} />
      <LineTab
        {...args}
        items={["항목명", "항목명", "항목명", "항목명", "항목명"]}
      />
    </div>
  ),
  args: { size: "l" },
};

/** 클릭 시 선택 인덱스가 바뀌는 동작 예시 */
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState(0);
    return <LineTab {...args} value={value} onChange={setValue} />;
  },
  args: { items: ["전체", "진행중", "완료"], size: "l" },
};
