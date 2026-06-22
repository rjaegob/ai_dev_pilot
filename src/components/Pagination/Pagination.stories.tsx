import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=7122-29786",
    },
  },
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    total: { control: { type: "number", min: 1 } },
  },
  args: { page: 1, total: 10 },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

/** Figma 기본 상태 — 10페이지 중 1페이지 선택 (이전 화살표 비활성) */
export const Default: Story = { args: { page: 1, total: 10 } };

/** 중간 페이지 — 양쪽 화살표 모두 활성 */
export const Middle: Story = { args: { page: 5, total: 10 } };

/** 마지막 페이지 — 다음 화살표 비활성 */
export const Last: Story = { args: { page: 10, total: 10 } };

/** 클릭·화살표로 페이지가 바뀌는 동작 예시 */
export const Interactive: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} page={page} onChange={setPage} />;
  },
  args: { total: 10 },
};
