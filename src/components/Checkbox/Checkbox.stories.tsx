import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=128-26540",
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { disabled: false },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

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

/** 전체 매트릭스 — checked × disabled */
export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {([false, true] as const).map((disabled) => (
        <div key={String(disabled)} className="flex items-center gap-4">
          <span className="text-body3-regular text-fg-muted w-20">
            {disabled ? "disabled" : "enabled"}
          </span>
          <Checkbox checked={false} disabled={disabled} />
          <Checkbox checked disabled={disabled} />
        </div>
      ))}
    </div>
  ),
};
