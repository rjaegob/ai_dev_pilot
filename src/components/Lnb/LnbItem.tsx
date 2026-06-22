import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "../Icon/Icon";

export interface LnbItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 메뉴 라벨 */
  children: ReactNode;
  /** 선행 아이콘(size 20, 텍스트 색 상속). 미지정 시 아이콘 없음 */
  icon?: IconName;
  /** 활성 상태 — true면 글자·아이콘 greyscale-700, 비활성은 greyscale-500 */
  active?: boolean;
}

/**
 * LNB 2-depth 메뉴의 단일 항목.
 * 활성: 글자·아이콘 greyscale-700, 비활성: greyscale-500.
 * 아이콘은 currentColor 기반이라 텍스트 색을 그대로 따른다(LineTab 패턴, inline var()).
 */
export function LnbItem({
  children,
  icon,
  active = false,
  className,
  type = "button",
  ...rest
}: LnbItemProps) {
  return (
    <button
      type={type}
      style={{
        color: active
          ? "var(--color-greyscale-700)"
          : "var(--color-greyscale-500)",
      }}
      className={[
        "flex w-full cursor-pointer items-center rounded-sm px-1 py-1.5",
        "text-caption1-semibold",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <span className="flex min-w-px flex-1 items-center gap-2">
        {icon && <Icon name={icon} size={20} color="current" />}
        <span className="whitespace-nowrap">{children}</span>
      </span>
    </button>
  );
}
