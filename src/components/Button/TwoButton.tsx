import { Button, type ButtonSize, type ButtonState } from "./Button";

export interface TwoButtonProps {
  /** 크기 — lg(56) / md(48) / sm(40). 기본 md */
  size?: ButtonSize;
  /** 상태 — 두 버튼에 공통 적용. 기본 enabled */
  state?: ButtonState;
  /** 좌측 secondary(취소) 라벨. 기본 '취소' */
  cancelLabel?: string;
  /** 우측 primary(확인) 라벨. 기본 '확인' */
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  className?: string;
}

/**
 * 취소(secondary) + 확인(primary) 2-버튼 푸터 그룹.
 * Figma "TwoButton" — 두 버튼은 동일 폭(flex-1), gap-2 간격, state 는 그룹 공통.
 */
export function TwoButton({
  size = "md",
  state = "enabled",
  cancelLabel = "취소",
  confirmLabel = "확인",
  onCancel,
  onConfirm,
  className,
}: TwoButtonProps) {
  return (
    <div
      className={["flex items-center gap-2", className]
        .filter(Boolean)
        .join(" ")}
    >
      <Button
        variant="secondary"
        size={size}
        state={state}
        className="flex-1"
        onClick={onCancel}
      >
        {cancelLabel}
      </Button>
      <Button
        variant="primary"
        size={size}
        state={state}
        className="flex-1"
        onClick={onConfirm}
      >
        {confirmLabel}
      </Button>
    </div>
  );
}
