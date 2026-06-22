import { type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import { Checkbox } from "../Checkbox/Checkbox";
import { Radio } from "../Radio/Radio";
import { Toggle } from "../Toggle/Toggle";

/** 콘텐츠 셀 종류 (Figma type 축) */
export type TableCellType =
  | "contents"
  | "toggle"
  | "checkbox"
  | "radio"
  | "overflow"
  | "tag"
  | "txtbtn";
/** 셀 상태 — default / hover */
export type TableCellState = "default" | "hover";
/** 텍스트 정렬 */
export type TableCellAlign = "left" | "center";

export interface TableCellProps {
  /** 셀 종류 — 기본 contents */
  type?: TableCellType;
  /** 상태 — default / hover. 기본 default */
  state?: TableCellState;
  /** 배경 모드 — on(기본 surface) / off(기본 white). hover 시 둘 다 primary surface */
  bg?: "on" | "off";
  /** 텍스트 정렬 — 기본 left */
  align?: TableCellAlign;
  /** 숫자 모드 — on 이면 "1" 류 우측정렬 값 (type=contents). 기본 off */
  number?: "on" | "off";
  /** contents 텍스트 — 기본 "내용" (number=on 이면 "1") */
  value?: ReactNode;
  /** tag 라벨 목록 (type=tag) */
  tags?: string[];
  /** txtbtn 라벨 (type=txtbtn) */
  buttonLabel?: ReactNode;
  /** txtbtn 클릭 콜백 */
  onButtonClick?: () => void;
  /** overflow 버튼 클릭 콜백 */
  onOverflowClick?: () => void;
  /** checkbox/radio/toggle 선택 상태 */
  checked?: boolean;
  /** checkbox/radio/toggle 변경 콜백 */
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

/**
 * 배경색 토큰: hover 는 bg 무관 primary-200, default 는 bg(on=surface / off=white).
 *  - primary-200 은 semantic 유틸이 없어 Button 패턴대로 inline var() 로 참조.
 *  - default 는 semantic 유틸(bg-surface / bg-bg)로 표현 가능.
 */
function bgStyle(
  state: TableCellState,
  bg: "on" | "off",
): {
  className: string;
  style?: { backgroundColor: string };
} {
  if (state === "hover") {
    return {
      className: "",
      style: { backgroundColor: "var(--color-primary-200)" },
    };
  }
  return { className: bg === "on" ? "bg-surface" : "bg-bg" };
}

/** TD 공통: 높이 48, 좌우 패딩 16, 하단 보더 greyscale-200(inline var). */
const BASE = "flex h-12 items-center overflow-clip border-b border-solid px-4";
const BORDER_STYLE = { borderColor: "var(--color-greyscale-200)" };
/** 회색 pill 라벨 — 배경 greyscale-500(inline var), 글자 흰색, caption2 */
const TAG_BG_STYLE = { backgroundColor: "var(--color-greyscale-500)" };
/** Text Button — primary-800(inline var) + 밑줄, body2 */
const TXTBTN_STYLE = { color: "var(--color-primary-800)" };

export function TableCell({
  type = "contents",
  state = "default",
  bg = "on",
  align = "left",
  number = "off",
  value,
  tags = ["가나다라마바사아", "가나다라마바사아"],
  buttonLabel = "Text Button",
  onButtonClick,
  onOverflowClick,
  checked,
  onCheckedChange,
  className,
}: TableCellProps) {
  const { className: bgClass, style: bgVar } = bgStyle(state, bg);
  const justify = align === "center" ? "justify-center" : "justify-start";
  const handleToggle = (e: { target: { checked: boolean } }) =>
    onCheckedChange?.(e.target.checked);

  let content: ReactNode = null;
  switch (type) {
    case "contents":
      content = (
        <span
          className={[
            "text-body2-regular text-fg-muted",
            number === "on" ? "text-right" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {value ?? (number === "on" ? "1" : "내용")}
        </span>
      );
      break;
    case "toggle":
      content = <Toggle size="sm" checked={checked} onChange={handleToggle} />;
      break;
    case "checkbox":
      content = <Checkbox checked={checked} onChange={handleToggle} />;
      break;
    case "radio":
      content = <Radio checked={checked} onChange={handleToggle} />;
      break;
    case "overflow":
      content = (
        <button
          type="button"
          onClick={onOverflowClick}
          className="inline-flex cursor-pointer items-center justify-center text-fg"
          aria-label="더보기"
        >
          <Icon name="overflow" size={24} color="current" />
        </button>
      );
      break;
    case "tag":
      content = (
        <span className="inline-flex items-center gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              style={TAG_BG_STYLE}
              className="inline-flex h-6 items-center rounded-sm px-1.5 py-1"
            >
              <span className="text-caption2-regular text-on-primary whitespace-nowrap">
                {tag}
              </span>
            </span>
          ))}
        </span>
      );
      break;
    case "txtbtn":
      content = (
        <button
          type="button"
          onClick={onButtonClick}
          style={TXTBTN_STYLE}
          className="inline-flex cursor-pointer text-body2-regular underline"
        >
          {buttonLabel}
        </button>
      );
      break;
  }

  return (
    <div
      style={{ ...BORDER_STYLE, ...bgVar }}
      className={[BASE, bgClass, justify, className].filter(Boolean).join(" ")}
    >
      {content}
    </div>
  );
}
