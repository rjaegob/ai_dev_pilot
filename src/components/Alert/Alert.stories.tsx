import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Alert } from "./Alert";
import { Icon } from "../Icon/Icon";

const FIGMA_URL =
  "https://www.figma.com/design/tjxONVhn5Zs2XIlu3M8wZc/-%EC%95%8C%EC%A0%9C%EA%B3%B1-%EA%B3%B5%EC%9C%A0%EC%9A%A9-%EC%88%98%EC%97%85%EC%9E%90%EB%A3%8C?node-id=4030-11567";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  args: {
    title: "타이틀",
    children: "메세지 영역",
    onConfirm: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 타이틀 + 본문 + 1버튼(확인) */
export const Message: Story = {
  args: { variant: "message" },
};

/** 타이틀 + 본문 + 2버튼(취소·확인) */
export const MessageTwoButton: Story = {
  args: { variant: "message-two-button" },
};

/** 닫기형 — 타이틀 + 본문 + 1버튼 */
export const CloseButton: Story = {
  args: { variant: "close-button", confirmLabel: "닫기" },
};

/** 닫기형 — 타이틀 + 본문 + 2버튼 */
export const CloseTwoButton: Story = {
  args: { variant: "close-two-button" },
};

/** 아이콘 + 메시지 + 1버튼 (헤더 없음) */
export const Image: Story = {
  args: {
    variant: "image",
    icon: <Icon name="complete" size={32} color="primary" />,
    children: "메세지 영역",
  },
};

/** 헤더 + 아이콘 + 메시지 + 2버튼 */
export const ImageTwoButton: Story = {
  args: {
    variant: "image-two-button",
    icon: <Icon name="complete" size={32} color="primary" />,
  },
};

/** 닫기형 아이콘 — 아이콘 + 메시지 + 1버튼 */
export const CloseImage: Story = {
  args: {
    variant: "close-image",
    icon: <Icon name="complete" size={32} color="primary" />,
    confirmLabel: "닫기",
  },
};

/** 에러 케이스 — 타이틀 + 본문 + 에러박스 + 1버튼 */
export const ErrorCase: Story = {
  args: {
    variant: "errorcase",
    children: (
      <div className="flex flex-col gap-4">
        <p>메시지가 길게 들어가는 경우의 본문 영역입니다.</p>
        <div className="max-h-40 overflow-y-auto rounded-md bg-surface p-4 text-body2-regular break-all">
          {`Error: model verification failed (code: V1.7) — scanned_count: 25, infected_count: 0`}
        </div>
      </div>
    ),
  },
};

/** 에러 케이스 2 — info 박스 + 2버튼(아니요·예) */
export const ErrorCase2: Story = {
  args: {
    variant: "errorcase2",
    cancelLabel: "아니요",
    confirmLabel: "예",
    children: (
      <div className="flex flex-col gap-4">
        <p>이대로 진행하시겠습니까?</p>
        <div className="rounded-md bg-surface p-4 text-body2-regular">
          진행 시 변경 사항을 되돌릴 수 없습니다.
        </div>
      </div>
    ),
  },
};

/** bullet 목록 본문 + 2버튼 */
export const BulletList: Story = {
  args: {
    variant: "bullet-list",
    children: (
      <ul className="flex list-disc flex-col gap-1 pl-4">
        <li>첫 번째 안내 항목입니다.</li>
        <li>두 번째 안내 항목입니다.</li>
        <li>세 번째 안내 항목입니다.</li>
      </ul>
    ),
  },
};

/** bullet 목록 본문 + 2버튼 (배치 변형) */
export const BulletList2: Story = {
  args: {
    variant: "bullet-list-2",
    children: (
      <ul className="flex list-disc flex-col gap-1 pl-4">
        <li>확인이 필요한 항목입니다.</li>
        <li>추가 확인 항목입니다.</li>
      </ul>
    ),
  },
};

/** play — 확인 버튼 클릭 시 onConfirm 호출 검증 */
export const ConfirmInteraction: Story = {
  args: { variant: "message-two-button" },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const confirm = canvas.getByRole("button", { name: "확인" });
    await userEvent.click(confirm);
    await expect(args.onConfirm).toHaveBeenCalled();
  },
};
