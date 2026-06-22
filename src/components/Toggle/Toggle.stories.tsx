import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=6840-58128",
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["md", "sm"] },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { size: "md", disabled: false },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

/** Unselected — 꺼짐(클릭으로 토글) */
export const Unselected: Story = {};

/** Selected — 켜짐 */
export const Selected: Story = { args: { checked: true } };

/** Disabled */
export const Disabled: Story = { args: { disabled: true } };

/** Disabled Selected */
export const DisabledSelected: Story = {
  args: { checked: true, disabled: true },
};

/** 전체 매트릭스 — size × (checked × disabled) */
export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["md", "sm"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-4">
          <span className="text-body2-semibold text-fg">{size}</span>
          {([false, true] as const).map((disabled) => (
            <div key={String(disabled)} className="flex items-center gap-6">
              <span className="text-body3-regular text-fg-muted w-20">
                {disabled ? "disabled" : "enabled"}
              </span>
              <Toggle size={size} checked={false} disabled={disabled} />
              <Toggle size={size} checked disabled={disabled} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
