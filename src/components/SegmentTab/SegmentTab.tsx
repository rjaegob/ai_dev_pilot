import { SegmentTabItem } from "./SegmentTabItem";

export interface SegmentTabProps {
  /** 세그먼트 라벨 목록 (Figma segment 2~3) */
  items: string[];
  /** 활성 세그먼트 인덱스 */
  value?: number;
  /** 세그먼트 클릭 시 인덱스 전달 */
  onChange?: (index: number) => void;
  className?: string;
}

/**
 * 세그먼트 탭 — neutral-100 트랙 안에 SegmentTabItem 들을 동일 너비로 나열한다.
 * 트랙 배경 색은 semantic 유틸이 없어 inline var() 로 참조.
 */
export function SegmentTab({
  items,
  value = 0,
  onChange,
  className,
}: SegmentTabProps) {
  return (
    <div
      role="tablist"
      style={{ backgroundColor: "var(--color-neutral-100)" }}
      className={["flex w-full gap-1 rounded-md p-1", className]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((label, index) => (
        <SegmentTabItem
          key={index}
          role="tab"
          aria-selected={index === value}
          active={index === value}
          onClick={() => onChange?.(index)}
        >
          {label}
        </SegmentTabItem>
      ))}
    </div>
  );
}
