import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { ICON_12, ICON_16, ICON_20, ICON_24, ICON_32 } from "./icons";

const NAMES_12 = Object.keys(ICON_12);
const NAMES_16 = Object.keys(ICON_16);
const NAMES_20 = Object.keys(ICON_20);
const NAMES_24 = Object.keys(ICON_24);
const NAMES_32 = Object.keys(ICON_32);
const ALL_NAMES = Array.from(
  new Set([...NAMES_12, ...NAMES_16, ...NAMES_20, ...NAMES_24, ...NAMES_32]),
);

const meta: Meta<typeof Icon> = {
  title: "Foundation/Icon",
  component: Icon,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=25027-9360",
    },
  },
  argTypes: {
    name: { control: "select", options: ALL_NAMES },
    size: { control: "inline-radio", options: [12, 16, 20, 24, 32] },
    color: {
      control: "inline-radio",
      options: [
        "current",
        "fg",
        "fg-muted",
        "primary",
        "danger",
        "success",
        "on-primary",
      ],
    },
  },
  args: { name: "close", size: 16, color: "fg" },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

const Cell = ({ children, label }: { children: ReactNode; label: string }) => (
  <div className="flex w-20 flex-col items-center gap-2 text-fg-muted">
    {children}
    <span className="text-xs">{label}</span>
  </div>
);

/** ic-system-12 — size 12 세트 */
export const System12: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 text-fg">
      {NAMES_12.map((name) => (
        <Cell key={name} label={name}>
          <Icon name={name as never} size={12} />
        </Cell>
      ))}
    </div>
  ),
};

/** ic-system-16 — size 16 세트 */
export const System16: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 text-fg">
      {NAMES_16.map((name) => (
        <Cell key={name} label={name}>
          <Icon name={name as never} size={16} />
        </Cell>
      ))}
    </div>
  ),
};

/** ic-system-20 — size 20 세트 (AI/MLOps 도메인) */
export const System20: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 text-fg">
      {NAMES_20.map((name) => (
        <Cell key={name} label={name}>
          <Icon name={name as never} size={20} />
        </Cell>
      ))}
    </div>
  ),
};

/** ic-system-24 — size 24 세트 */
export const System24: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 text-fg">
      {NAMES_24.map((name) => (
        <Cell key={name} label={name}>
          <Icon name={name as never} size={24} />
        </Cell>
      ))}
    </div>
  ),
};

/** ic-system-32 — size 32 세트 (카테고리/내비, default↔accent는 color로 전환) */
export const System32: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 text-fg">
      {NAMES_32.map((name) => (
        <Cell key={name} label={name}>
          <Icon name={name as never} size={32} />
        </Cell>
      ))}
    </div>
  ),
};

/** 색은 토큰 text-* 로 제어 — 상태 아이콘(2톤)은 white 녹아웃이 보존된다 */
export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="info" size={16} color="fg" />
      <Icon name="info" size={16} color="fg-muted" />
      <Icon name="export" size={16} color="primary" />
      <Icon name="error" size={16} color="danger" />
      <Icon name="complete" size={16} color="primary" />
    </div>
  ),
};
