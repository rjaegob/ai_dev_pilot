import type { ReactNode } from "react";

/** 텍스트 정렬 — left / center */
export type TableDataCellAlign = "left" | "center";

export interface TableDataCellProps {
  /** 우측 컬럼 구분선(border-r) 토글 — 기본 false */
  line?: boolean;
  /** 텍스트 정렬 — 기본 left */
  align?: TableDataCellAlign;
  /** 셀 콘텐츠 슬롯(Label/TextButton 등 임의 노드, 또는 문자열 텍스트) */
  children?: ReactNode;
  className?: string;
}

/** 보더 색 greyscale-200 — semantic 유틸이 없어 TableCell 패턴대로 inline var() 로 참조. */
const BORDER_STYLE = { borderColor: "var(--color-greyscale-200)" };

/** TD 공통: 세로 가운데, 하단 보더 항상, 패딩 12. */
const BASE = "flex items-center overflow-clip border-b border-solid bg-bg p-3";

export function TableDataCell({
  line = false,
  align = "left",
  children,
  className,
}: TableDataCellProps) {
  const justify = align === "center" ? "justify-center" : "justify-start";

  // 문자열 텍스트는 fg-muted + body2 로 렌더, 그 외(노드)는 슬롯 그대로.
  const content =
    typeof children === "string" ? (
      <span className="text-body2-regular text-fg-muted">{children}</span>
    ) : (
      children
    );

  return (
    <div
      style={BORDER_STYLE}
      className={[BASE, justify, line ? "border-r" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {content}
    </div>
  );
}
