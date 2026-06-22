import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface SegmentTabItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 세그먼트 라벨 */
  children: ReactNode;
  /** 활성 상태 — true면 흰 배경 + 그림자 + primary 글자색 */
  active?: boolean;
}

/**
 * 세그먼트 탭의 단일 칩.
 * 활성: 배경 neutral-0 + shadow-segment + 글자 primary-800.
 * 비활성: 배경 neutral-100(트랙과 동일) + 글자 greyscale-600.
 * 색은 semantic 유틸이 없어 LineTab/Button 패턴대로 inline var() 로 참조.
 */
export function SegmentTabItem({
  children,
  active = false,
  className,
  type = "button",
  ...rest
}: SegmentTabItemProps) {
  return (
    <button
      type={type}
      style={{
        color: active
          ? "var(--color-primary-800)"
          : "var(--color-greyscale-600)",
        backgroundColor: active
          ? "var(--color-neutral-0)"
          : "var(--color-neutral-100)",
      }}
      className={[
        "flex flex-1 basis-0 cursor-pointer items-center justify-center",
        "whitespace-nowrap rounded-xs px-2.5 py-2 text-center text-body1-regular",
        active ? "shadow-segment" : "",
        "disabled:cursor-not-allowed disabled:opacity-50",
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
