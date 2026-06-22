import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=128-85042",
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: { disabled: false },
};
export default meta;

type Story = StoryObj<typeof Radio>;

/** Unselected — 선택 안 됨(클릭으로 토글) */
export const Unselected: Story = {};

/** Selected */
export const Selected: Story = { args: { checked: true } };

/** Disabled */
export const Disabled: Story = { args: { disabled: true } };

/** Disabled Selected */
export const DisabledSelected: Story = {
  args: { checked: true, disabled: true },
};

/** 라벨 포함 */
export const WithLabel: Story = { args: { label: "레이블" } };

/** 전체 매트릭스 — checked × disabled (라벨 포함) */
export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {([false, true] as const).map((disabled) => (
        <div key={String(disabled)} className="flex items-center gap-6">
          <span className="text-body3-regular text-fg-muted w-20">
            {disabled ? "disabled" : "enabled"}
          </span>
          <Radio checked={false} disabled={disabled} label="레이블" />
          <Radio checked disabled={disabled} label="레이블" />
        </div>
      ))}
    </div>
  ),
};
