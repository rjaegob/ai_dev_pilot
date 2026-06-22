import { LnbRailItem } from "./LnbRailItem";
import type { IconName } from "../Icon/Icon";

export interface LnbRailMenuItem {
  /** 항목 식별값 (선택 비교용) */
  value: string;
  /** 메뉴 라벨 */
  label: string;
  /** 메뉴 아이콘 (size 32) */
  icon: IconName;
}

export interface LnbRailProps {
  /** 메뉴 항목 목록 (홈~관리) */
  items: LnbRailMenuItem[];
  /** 활성 항목 value */
  value?: string;
  /** 항목 클릭 시 value 전달 */
  onChange?: (value: string) => void;
  className?: string;
}

/**
 * LNB 1-depth 아이콘 레일 (Figma 273-36843).
 * 흰 배경 + 우측 구분선(greyscale-200), LnbRailItem 들을 세로로 나열한다.
 * 폭은 --layout-lnb-rail-w 토큰. 색·구분선은 inline var() 로 참조(LineTab 패턴).
 */
export function LnbRail({ items, value, onChange, className }: LnbRailProps) {
  return (
    <nav
      style={{
        width: "var(--layout-lnb-rail-w)",
        backgroundColor: "var(--color-neutral-0)",
        borderColor: "var(--color-greyscale-200)",
      }}
      className={["flex h-full flex-col border-r border-solid pb-8", className]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item) => (
        <LnbRailItem
          key={item.value}
          icon={item.icon}
          active={item.value === value}
          aria-current={item.value === value ? "page" : undefined}
          onClick={() => onChange?.(item.value)}
        >
          {item.label}
        </LnbRailItem>
      ))}
    </nav>
  );
}
