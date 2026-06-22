import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "../Icon/Icon";

export interface LnbRailItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 메뉴 라벨 (아이콘 하단) */
  children: ReactNode;
  /** 메뉴 아이콘 (size 32, 텍스트 색 상속) */
  icon: IconName;
  /** 선택 상태 — true면 primary-100 배경 + primary-700 글자·아이콘 + 좌측 액센트 바 */
  active?: boolean;
}

/**
 * LNB 1-depth 아이콘 레일의 단일 항목 (아이콘 32 + 라벨 세로 스택).
 * 선택: 배경 primary-100, 글자·아이콘 primary-700, 좌측 액센트 바(w-0.5).
 * 비선택: 배경 neutral-0, 글자·아이콘 greyscale-400.
 * 아이콘은 currentColor 기반이라 텍스트 색을 따른다(LineTab 패턴, inline var()).
 */
export function LnbRailItem({
  children,
  icon,
  active = false,
  className,
  type = "button",
  ...rest
}: LnbRailItemProps) {
  return (
    <button
      type={type}
      style={{
        color: active
          ? "var(--color-primary-700)"
          : "var(--color-greyscale-400)",
        backgroundColor: active
          ? "var(--color-primary-100)"
          : "var(--color-neutral-0)",
      }}
      className={[
        "relative flex w-full cursor-pointer flex-col items-center justify-center",
        "py-3 text-center text-body3-semibold",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {active && (
        <span
          aria-hidden
          style={{ backgroundColor: "var(--color-primary-700)" }}
          className="absolute left-0 top-3 h-13 w-0.5 rounded-r-sm"
        />
      )}
      <Icon name={icon} size={32} color="current" />
      <span>{children}</span>
    </button>
  );
}
