import { LineTabItem, type LineTabSize } from "./LineTabItem";

export interface LineTabProps {
  /** 탭 항목 라벨 목록 (Figma segments 2~5) */
  items: string[];
  /** 선택된 항목 인덱스 */
  value?: number;
  /** 항목 클릭 시 인덱스 전달 */
  onChange?: (index: number) => void;
  /** 크기 — l(Title3) / m(Body2) */
  size?: LineTabSize;
  className?: string;
}

/**
 * 라인탭 — 하단 구분선(greyscale-300) 위에 LineTabItem 들을 나열한다.
 * 구분선 색은 semantic 유틸이 없어 inline var() 로 참조.
 */
export function LineTab({
  items,
  value = 0,
  onChange,
  size = "l",
  className,
}: LineTabProps) {
  const height = size === "l" ? "h-12" : "h-10";

  return (
    <div
      role="tablist"
      style={{ borderColor: "var(--color-greyscale-300)" }}
      className={["flex items-start border-b border-solid", height, className]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((label, index) => (
        <LineTabItem
          key={index}
          role="tab"
          aria-selected={index === value}
          size={size}
          selected={index === value}
          onClick={() => onChange?.(index)}
        >
          {label}
        </LineTabItem>
      ))}
    </div>
  );
}
