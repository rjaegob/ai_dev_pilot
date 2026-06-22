import type { ButtonHTMLAttributes, ReactNode } from "react";

export type LineTabSize = "l" | "m";

export interface LineTabItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 탭 항목 라벨 */
  children: ReactNode;
  /** 크기 — l(Title3) / m(Body2) */
  size?: LineTabSize;
  /** 선택 상태 — true면 하단 밑줄 + primary 색 */
  selected?: boolean;
}

/**
 * 라인탭의 단일 항목.
 * 선택 시 하단 밑줄(primary-800) + 글자색 primary-800, 비선택은 greyscale-500.
 * 색은 semantic 유틸이 없어 Button/TextButton 패턴대로 inline var() 로 참조.
 */
export function LineTabItem({
  children,
  size = "l",
  selected = false,
  className,
  type = "button",
  ...rest
}: LineTabItemProps) {
  const isL = size === "l";
  // L: 높이 큼·좌우 넓음·Title3 / M: 높이 작음·좌우 좁음·Body2
  const outer = isL ? "h-12 px-4" : "h-10 px-2";
  const textUtil = isL
    ? selected
      ? "text-title3-bold"
      : "text-title3-semibold"
    : "text-body2-semibold";

  const textColor = selected
    ? "var(--color-primary-800)"
    : "var(--color-greyscale-500)";

  return (
    <button
      type={type}
      style={{ color: textColor }}
      className={[
        "flex shrink-0 cursor-pointer items-stretch justify-center",
        outer,
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <span
        style={
          selected ? { borderColor: "var(--color-primary-800)" } : undefined
        }
        className={[
          "flex h-full items-center justify-center whitespace-nowrap px-3",
          textUtil,
          selected ? "border-b-2 border-solid" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </span>
    </button>
  );
}
