import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "lg" | "md" | "sm";
export type ButtonState = "enabled" | "pressed" | "disabled";

/** size → 높이·패딩·라디우스·타이포 토큰 유틸 (lg=56 / md=48 / sm=40) */
const SIZE_CLASS: Record<ButtonSize, string> = {
  lg: "h-14 px-4 py-3.5 rounded-lg text-title2-semibold",
  md: "h-12 px-4 py-3.5 rounded-md text-title4-semibold",
  sm: "h-10 px-3 py-2.5 rounded-md text-body2-regular",
};

/**
 * variant × state → 배경/글자 색 토큰(var 참조).
 *  - disabled 는 variant 무관 공통(greyscale-200 / greyscale-500).
 *  - primitive 컬러 토큰은 유틸이 없어 inline style 의 var() 로 참조한다.
 */
function colorVars(
  variant: ButtonVariant,
  state: ButtonState,
): { backgroundColor: string; color: string } {
  if (state === "disabled") {
    return {
      backgroundColor: "var(--color-greyscale-200)",
      color: "var(--color-greyscale-500)",
    };
  }
  if (variant === "primary") {
    return {
      backgroundColor:
        state === "pressed"
          ? "var(--color-primary-900)"
          : "var(--color-primary-800)",
      color: "var(--color-text-white)",
    };
  }
  // secondary
  return {
    backgroundColor:
      state === "pressed"
        ? "var(--color-greyscale-300)"
        : "var(--color-greyscale-200)",
    color: "var(--color-greyscale-800)",
  };
}

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled"
> {
  /** 색 역할 — primary(blue) / secondary(grey). 기본 primary */
  variant?: ButtonVariant;
  /** 크기 — lg(56) / md(48) / sm(40). 기본 md */
  size?: ButtonSize;
  /** 상태 — enabled / pressed / disabled. 기본 enabled */
  state?: ButtonState;
}

export function Button({
  variant = "primary",
  size = "md",
  state = "enabled",
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={state === "disabled"}
      style={colorVars(variant, state)}
      className={[
        "inline-flex items-center justify-center whitespace-nowrap",
        SIZE_CLASS[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
