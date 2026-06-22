import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SegmentTab } from "./SegmentTab";

const meta: Meta<typeof SegmentTab> = {
  title: "Components/SegmentTab/SegmentTab",
  component: SegmentTab,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=6746-14559",
    },
  },
  argTypes: { value: { control: { type: "number", min: 0 } } },
  args: { items: ["항목명", "항목명", "항목명"], value: 0 },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SegmentTab>;

/** segment 1~3 (활성 위치별) */
export const Segments: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <SegmentTab {...args} value={0} />
      <SegmentTab {...args} value={1} />
      <SegmentTab {...args} value={2} />
    </div>
  ),
};

/** 클릭 시 활성 세그먼트가 바뀌는 동작 예시 */
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState(0);
    return <SegmentTab {...args} value={value} onChange={setValue} />;
  },
  args: { items: ["일간", "주간", "월간"] },
};
