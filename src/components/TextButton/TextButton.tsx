import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "../Icon/Icon";

export interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 텍스트 */
  children: ReactNode;
  /** 후행 아이콘 이름(size 16, 텍스트 색 상속). 미지정 시 아이콘 없음 */
  icon?: IconName;
}

/**
 * 텍스트 색 primary-800 — semantic 유틸이 없어 Button/TableCell 패턴대로 inline var() 로 참조.
 * 아이콘은 currentColor 기반이라 텍스트 색(primary-800)을 그대로 따른다.
 */
const TEXT_STYLE = { color: "var(--color-primary-800)" };

export function TextButton({
  children,
  icon,
  className,
  type = "button",
  ...rest
}: TextButtonProps) {
  return (
    <button
      type={type}
      style={TEXT_STYLE}
      className={[
        "inline-flex cursor-pointer items-center gap-0.5",
        "text-body2-regular underline",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
      {icon && <Icon name={icon} size={16} color="current" />}
    </button>
  );
}
