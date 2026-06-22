import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "../Icon/Icon";

export type FilterChipVariant = "icon" | "chip";

/** 공통 색 토큰(var 참조) — bg neutral-0 / border greyscale-400 / 글자·아이콘 greyscale-500 */
const CHIP_STYLE = {
  backgroundColor: "var(--color-neutral-0)",
  borderColor: "var(--color-greyscale-400)",
  color: "var(--color-greyscale-500)",
} as const;

export interface FilterChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 형태 — icon(정사각 아이콘, Filter/Type3) / chip(라벨+드롭다운). 기본 chip */
  variant?: FilterChipVariant;
  /** icon variant 의 아이콘 (기본 'sort') */
  icon?: IconName;
  /** 접근성 라벨 (icon variant 에 권장) */
  label?: string;
}

export function FilterChip({
  variant = "chip",
  icon = "sort",
  label,
  className,
  type = "button",
  children,
  ...rest
}: FilterChipProps) {
  if (variant === "icon") {
    return (
      <button
        type={type}
        aria-label={label}
        style={CHIP_STYLE}
        className={[
          "inline-flex size-8 items-center justify-center rounded-xs border",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <Icon
          name={icon}
          size={16}
          color="current"
          className="opacity-70"
          title={label}
        />
      </button>
    );
  }
  return (
    <button
      type={type}
      style={CHIP_STYLE}
      className={[
        "inline-flex h-8 items-center justify-center gap-1 whitespace-nowrap rounded-xs border px-2",
        "text-body2-semibold",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
      <Icon name="arrow-down" size={16} color="current" />
    </button>
  );
}
