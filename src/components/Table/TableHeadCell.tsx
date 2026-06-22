import type { ReactNode } from "react";

/** 텍스트 정렬 — left / center */
export type TableHeadCellAlign = "left" | "center";

export interface TableHeadCellProps {
  /** 우측 컬럼 구분선(border-r) 토글 — 기본 true */
  line?: boolean;
  /** 텍스트 정렬 — 기본 left */
  align?: TableHeadCellAlign;
  /** 헤더 텍스트(= children 대체) */
  label?: ReactNode;
  /** 헤더 콘텐츠 */
  children?: ReactNode;
  className?: string;
}

/** 보더 색 greyscale-200 — semantic 유틸이 없어 TableCell 패턴대로 inline var() 로 참조. */
const BORDER_STYLE = { borderColor: "var(--color-greyscale-200)" };

/** TH 공통: 높이 48 고정, 세로 가운데, 하단 보더 항상, 패딩 12/14. */
const BASE =
  "flex h-12 flex-col justify-center overflow-clip border-b border-solid bg-surface px-3 py-3.5";

export function TableHeadCell({
  line = true,
  align = "left",
  label,
  children,
  className,
}: TableHeadCellProps) {
  const textAlign = align === "center" ? "text-center" : "text-left";

  return (
    <div
      style={BORDER_STYLE}
      className={[BASE, line ? "border-r" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={["text-body2-regular text-fg", textAlign].join(" ")}>
        {children ?? label}
      </span>
    </div>
  );
}
