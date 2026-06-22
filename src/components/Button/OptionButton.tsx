import type { ButtonHTMLAttributes, CSSProperties } from "react";

export type OptionButtonVariant = "outline" | "solid" | "soft";
export type OptionButtonState = "default" | "accent" | "disabled";

/** variant 별 박스 형태(패딩·radius·테두리 유무는 아래 resolve 에서 결정) */
const SHAPE: Record<OptionButtonVariant, string> = {
  outline: "px-2 rounded-xs",
  solid: "px-3 rounded-xs",
  soft: "px-3 rounded-md",
};

/**
 * (variant, state) → 색 토큰(var 참조) + 테두리 유무 + 글자 굵기.
 *  - outline: default/accent/disabled (항상 테두리)
 *  - solid:   accent(솔리드·테두리 없음) / disabled(테두리 있음)
 *  - soft:    단일 외형(state 무시)
 */
function resolve(
  variant: OptionButtonVariant,
  state: OptionButtonState,
): { style: CSSProperties; border: boolean; bold: boolean } {
  if (variant === "soft") {
    return {
      style: {
        backgroundColor: "var(--color-primary-200)",
        color: "var(--color-primary-800)",
      },
      border: false,
      bold: false,
    };
  }
  if (variant === "solid") {
    if (state === "disabled") {
      return {
        style: {
          backgroundColor: "var(--color-greyscale-300)",
          borderColor: "var(--color-greyscale-300)",
          color: "var(--color-greyscale-500)",
        },
        border: true,
        bold: false,
      };
    }
    return {
      style: {
        backgroundColor: "var(--color-primary-800)",
        color: "var(--color-text-white)",
      },
      border: false,
      bold: true,
    };
  }
  // outline
  switch (state) {
    case "accent":
      return {
        style: {
          backgroundColor: "var(--color-neutral-0)",
          borderColor: "var(--color-primary-800)",
          color: "var(--color-primary-800)",
        },
        border: true,
        bold: false,
      };
    case "disabled":
      return {
        style: {
          backgroundColor: "var(--color-neutral-100)",
          borderColor: "var(--color-greyscale-300)",
          color: "var(--color-greyscale-500)",
        },
        border: true,
        bold: false,
      };
    default:
      return {
        style: {
          backgroundColor: "var(--color-neutral-0)",
          borderColor: "var(--color-greyscale-300)",
          color: "var(--color-greyscale-800)",
        },
        border: true,
        bold: false,
      };
  }
}

export interface OptionButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled"
> {
  /** 스타일 — outline / solid / soft. 기본 outline */
  variant?: OptionButtonVariant;
  /** 상태 — default / accent / disabled (soft 는 무시). 기본 default */
  state?: OptionButtonState;
}

export function OptionButton({
  variant = "outline",
  state = "default",
  className,
  type = "button",
  children,
  ...rest
}: OptionButtonProps) {
  const { style, border, bold } = resolve(variant, state);
  return (
    <button
      type={type}
      disabled={state === "disabled"}
      style={style}
      className={[
        "inline-flex h-8 items-center justify-center whitespace-nowrap",
        SHAPE[variant],
        border ? "border" : "",
        bold ? "text-body2-semibold" : "text-body2-regular",
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
