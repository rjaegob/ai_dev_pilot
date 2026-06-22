import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "../Icon/Icon";

export type IconButtonState = "default" | "active" | "inactive";

/**
 * state → 배경/테두리/아이콘 색 토큰(var 참조). 아이콘은 currentColor 로 글자색을 따른다.
 */
function colorVars(state: IconButtonState): {
  backgroundColor: string;
  borderColor: string;
  color: string;
} {
  switch (state) {
    case "active":
      return {
        backgroundColor: "var(--color-neutral-0)",
        borderColor: "var(--color-primary-800)",
        color: "var(--color-primary-800)",
      };
    case "inactive":
      return {
        backgroundColor: "var(--color-neutral-100)",
        borderColor: "var(--color-greyscale-300)",
        color: "var(--color-greyscale-500)",
      };
    default:
      return {
        backgroundColor: "var(--color-neutral-0)",
        borderColor: "var(--color-greyscale-300)",
        color: "var(--color-greyscale-900)",
      };
  }
}

export interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled"
> {
  /** 표시할 아이콘 (size 24 세트). 예: 'minus', 'add'(plus) */
  icon: IconName;
  /** 상태 — default / active / inactive. 기본 default */
  state?: IconButtonState;
  /** 접근성 라벨 (아이콘 단독 버튼이므로 권장) */
  label?: string;
}

export function IconButton({
  icon,
  state = "default",
  label,
  className,
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      disabled={state === "inactive"}
      aria-label={label}
      style={colorVars(state)}
      className={[
        "inline-flex size-12 items-center justify-center rounded-md border",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <Icon name={icon} size={24} color="current" title={label} />
    </button>
  );
}
