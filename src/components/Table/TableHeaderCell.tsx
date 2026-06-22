import { type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import { Checkbox } from "../Checkbox/Checkbox";
import { Radio } from "../Radio/Radio";

/** 헤더 셀 종류 — text(라벨+정렬화살표) / checkbox(전체선택) / radio / empty */
export type TableHeaderCellType = "text" | "checkbox" | "radio" | "empty";
/** 정렬 화살표 방향 — none 이면 화살표 미노출 */
export type TableHeaderArrow = "down" | "up" | "none";
/** 텍스트 정렬 */
export type TableHeaderAlign = "left" | "center";

export interface TableHeaderCellProps {
  /** 셀 종류 — 기본 text */
  type?: TableHeaderCellType;
  /** 라벨 텍스트 (type=text) */
  label?: ReactNode;
  /** 정렬 화살표 (type=text) — 기본 none */
  arrow?: TableHeaderArrow;
  /** 텍스트 정렬 — 기본 left */
  align?: TableHeaderAlign;
  /** 전체선택 상태 (type=checkbox) */
  checked?: boolean;
  /** 전체선택 변경 콜백 (type=checkbox) */
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

/**
 * TH 공통: 높이 48, 흰 배경, 좌우 패딩 16, 하단 보더.
 *  - 하단 보더 색은 primary-500(primitive) → semantic 유틸이 없어
 *    Button/Checkbox 와 동일하게 inline style 의 var() 로 참조한다.
 */
const BASE = "flex h-12 items-center bg-bg border-b border-solid px-4";
const BORDER_STYLE = { borderColor: "var(--color-primary-500)" };

export function TableHeaderCell({
  type = "text",
  label = "제목",
  arrow = "none",
  align = "left",
  checked,
  onCheckedChange,
  className,
}: TableHeaderCellProps) {
  const justify = align === "center" ? "justify-center" : "justify-start";

  let content: ReactNode = null;
  if (type === "text") {
    content = (
      <span className="inline-flex items-center gap-0.5">
        <span className="text-body2-regular text-fg whitespace-nowrap">
          {label}
        </span>
        {arrow !== "none" && (
          <Icon
            name={arrow === "up" ? "grid-arrow-up" : "grid-arrow-down"}
            size={16}
            color="fg"
          />
        )}
      </span>
    );
  } else if (type === "checkbox") {
    content = (
      <Checkbox
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
      />
    );
  } else if (type === "radio") {
    content = <Radio />;
  }
  // type === 'empty' → content stays null

  return (
    <div
      style={BORDER_STYLE}
      className={[BASE, justify, className].filter(Boolean).join(" ")}
    >
      {content}
    </div>
  );
}
