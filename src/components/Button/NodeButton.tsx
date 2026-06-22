import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "../Icon/Icon";

export type NodeButtonState = "default" | "disabled";

/** state → 배경/글자(아이콘) 색 토큰(var 참조). 아이콘은 currentColor 로 글자색을 따른다. */
function colorVars(state: NodeButtonState): {
  backgroundColor: string;
  color: string;
} {
  return state === "disabled"
    ? {
        backgroundColor: "var(--color-neutral-100)",
        color: "var(--color-greyscale-500)",
      }
    : {
        backgroundColor: "var(--color-neutral-0)",
        color: "var(--color-greyscale-600)",
      };
}

export interface NodeButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled"
> {
  /** 상태 — default / disabled. 기본 default */
  state?: NodeButtonState;
  /** leading 아이콘 (기본 'note') */
  icon?: IconName;
}

export function NodeButton({
  state = "default",
  icon = "note",
  className,
  type = "button",
  children,
  ...rest
}: NodeButtonProps) {
  return (
    <button
      type={type}
      disabled={state === "disabled"}
      style={colorVars(state)}
      className={[
        "inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-xs px-3 py-2.5 shadow-3",
        "text-body2-regular",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <Icon name={icon} size={20} color="current" />
      {children}
    </button>
  );
}
