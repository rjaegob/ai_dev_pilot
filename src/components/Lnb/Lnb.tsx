import { Fragment } from "react";
import { LnbItem } from "./LnbItem";
import type { IconName } from "../Icon/Icon";

export interface LnbMenuItem {
  /** 항목 식별값 (선택 비교용) */
  value: string;
  /** 메뉴 라벨 */
  label: string;
  /** 선행 아이콘 (size 20) */
  icon?: IconName;
}

export interface LnbSection {
  /** 1depth 섹션 라벨 (예: 홈, 최근 이용 메뉴) */
  label: string;
  /** 섹션의 2depth 항목들 */
  items: LnbMenuItem[];
}

export interface LnbProps {
  /** 섹션 목록 (1depth 라벨 + 2depth 항목) */
  sections: LnbSection[];
  /** 활성 항목 value */
  value?: string;
  /** 항목 클릭 시 value 전달 */
  onChange?: (value: string) => void;
  className?: string;
}

/**
 * LNB 2-depth 네비게이션 패널 (Figma 273-50101).
 * 흰 배경 + 우측 구분선(greyscale-200), 섹션(1depth 라벨 + 2depth 리스트)을
 * 구분선으로 나눠 세로 나열한다. 폭은 --layout-lnb-2depth-w 토큰.
 * 색·구분선은 semantic 유틸이 없어 inline var() 로 참조(LineTab 패턴).
 */
export function Lnb({ sections, value, onChange, className }: LnbProps) {
  return (
    <nav
      style={{
        width: "var(--layout-lnb-2depth-w)",
        backgroundColor: "var(--color-neutral-0)",
        borderColor: "var(--color-greyscale-200)",
      }}
      className={["flex h-full flex-col border-r border-solid", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex w-full flex-1 flex-col gap-6 overflow-y-auto py-4">
        {sections.map((section, sectionIndex) => (
          <Fragment key={sectionIndex}>
            {sectionIndex > 0 && (
              <div
                style={{ backgroundColor: "var(--color-greyscale-200)" }}
                className="h-px w-full shrink-0"
              />
            )}
            <div className="flex w-full flex-col">
              <div
                style={{ color: "var(--color-greyscale-600)" }}
                className="flex w-full items-center px-3 py-2.5 text-caption1-semibold"
              >
                {section.label}
              </div>
              <div className="flex w-full flex-col px-2 py-1">
                {section.items.map((item) => (
                  <LnbItem
                    key={item.value}
                    icon={item.icon}
                    active={item.value === value}
                    aria-current={item.value === value ? "page" : undefined}
                    onClick={() => onChange?.(item.value)}
                  >
                    {item.label}
                  </LnbItem>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </nav>
  );
}
