import type { ReactNode } from "react";
import { Icon, type IconName } from "../Icon/Icon";

export type LabelColor =
  | "gray"
  | "red"
  | "blue"
  | "yellow"
  | "purple"
  | "orange"
  | "green";

/**
 * color → 배경/글자(=아이콘) 색 토큰(var 참조).
 * primitive 컬러 토큰은 유틸이 없어 inline style 의 var() 로 참조한다(Button 패턴).
 * 아이콘은 currentColor 기반이라 `color` 로 글자 색을 함께 따른다.
 */
const COLOR_VARS: Record<
  LabelColor,
  { backgroundColor: string; color: string }
> = {
  gray: {
    backgroundColor: "var(--color-label-neutral-light-gray)",
    color: "var(--color-label-neutral-deep)",
  },
  red: {
    backgroundColor: "var(--color-label-red-mid)",
    color: "var(--color-label-red-deep)",
  },
  blue: {
    backgroundColor: "var(--color-primary-300)",
    color: "var(--color-primary-800)",
  },
  yellow: {
    backgroundColor: "var(--color-label-orange-yellow)",
    color: "var(--color-label-orange-deep)",
  },
  purple: {
    backgroundColor: "var(--color-label-purple-mid)",
    color: "var(--color-label-purple-deep)",
  },
  orange: {
    backgroundColor: "var(--color-label-orange-light)",
    color: "var(--color-label-orange-deep)",
  },
  green: {
    backgroundColor: "var(--color-label-green-mid)",
    color: "var(--color-label-green-deep)",
  },
};

/**
 * color 별 기본 아이콘. Icon 세트(src/components/Icon)에서 매칭한 이름이다.
 * 일부는 디자인 모양과 정확히 일치하는 아이콘이 세트에 없어 가장 근접한 후보를 사용한다.
 *  - red / orange: `error`    (채워진 원 + ! — 디자인과 일치)
 *  - blue / purple: `complete` (채워진 원 + 체크 — 디자인과 일치)
 *  - gray: `minus`   (디자인은 채워진 원 안의 빼기, 세트엔 채워진 minus-circle 없음 → 근접 후보)
 *  - yellow: `error` (디자인은 주의 삼각형, 세트에 삼각형 아이콘 없음 → 근접 후보)
 *  - green: `info`   (디자인은 말풍선/채팅, size 16 세트에 채팅 아이콘 없음 → 근접 후보)
 * 위 기본값은 모두 size 16 세트에 존재해 렌더가 보장된다. icon prop 으로 override 가능.
 */
const DEFAULT_ICON: Record<LabelColor, IconName> = {
  gray: "minus",
  red: "error",
  blue: "complete",
  yellow: "error",
  purple: "complete",
  orange: "error",
  green: "info",
};

export interface LabelProps {
  /** 색 — gray/red/blue/yellow/purple/orange/green. 기본 gray */
  color?: LabelColor;
  /** 라벨 텍스트 */
  children: ReactNode;
  /** color 기본 아이콘 대신 사용할 Icon 이름(override) */
  icon?: IconName;
  /** true 면 아이콘을 숨기고 텍스트만 노출 */
  hideIcon?: boolean;
  className?: string;
}

export function Label({
  color = "gray",
  children,
  icon,
  hideIcon = false,
  className,
}: LabelProps) {
  const iconName = icon ?? DEFAULT_ICON[color];

  return (
    <span
      style={COLOR_VARS[color]}
      className={[
        "inline-flex h-6 items-center gap-1 overflow-hidden rounded-sm px-1.5",
        "text-caption2-semibold",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {!hideIcon && <Icon name={iconName} size={16} color="current" />}
      {children}
    </span>
  );
}
