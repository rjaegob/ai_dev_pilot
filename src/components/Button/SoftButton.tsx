import type { ButtonHTMLAttributes } from "react";

/**
 * SoftButton — 연한 파랑(톤) 솔리드 버튼. Figma "solidButton-40".
 * 단일 외형(primary-200 배경 / primary-800 글자). 색은 inline style 의 var() 로 참조.
 */
export interface SoftButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function SoftButton({
  className,
  type = "button",
  children,
  ...rest
}: SoftButtonProps) {
  return (
    <button
      type={type}
      style={{
        backgroundColor: "var(--color-primary-200)",
        color: "var(--color-primary-800)",
      }}
      className={[
        "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-6",
        "text-body2-semibold",
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
