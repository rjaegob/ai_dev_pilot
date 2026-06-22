import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "../Icon/Icon";

export type OutlineButtonState = "default" | "accent" | "disabled";

/**
 * state → 배경/테두리/글자 색 토큰(var 참조).
 * primitive 컬러 토큰은 유틸이 없어 inline style 의 var() 로 참조한다 (Button 과 동일 패턴).
 */
function colorVars(state: OutlineButtonState): {
  backgroundColor: string;
  borderColor: string;
  color: string;
} {
  switch (state) {
    case "accent":
      return {
        backgroundColor: "var(--color-neutral-0)",
        borderColor: "var(--color-primary-800)",
        color: "var(--color-primary-800)",
      };
    case "disabled":
      return {
        backgroundColor: "var(--color-neutral-100)",
        borderColor: "var(--color-greyscale-300)",
        color: "var(--color-greyscale-500)",
      };
    default:
      return {
        backgroundColor: "var(--color-neutral-0)",
        borderColor: "var(--color-greyscale-400)",
        color: "var(--color-greyscale-800)",
      };
  }
}

export interface OutlineButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled"
> {
  /** 상태 — default / accent / disabled. 기본 default */
  state?: OutlineButtonState;
  /** 선택적 leading 아이콘 (예: 'download'). 색은 글자색을 따른다 */
  icon?: IconName;
}

export function OutlineButton({
  state = "default",
  icon,
  className,
  type = "button",
  children,
  ...rest
}: OutlineButtonProps) {
  return (
    <button
      type={type}
      disabled={state === "disabled"}
      style={colorVars(state)}
      className={[
        "inline-flex h-10 items-center justify-center gap-1 whitespace-nowrap rounded-md border px-3 py-2.5",
        "text-body2-regular",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {icon && <Icon name={icon} size={20} color="current" />}
      {children}
    </button>
  );
}
