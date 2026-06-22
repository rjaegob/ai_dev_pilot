import {
  ICON_12,
  ICON_16,
  ICON_20,
  ICON_24,
  ICON_32,
  type Icon12Name,
  type Icon16Name,
  type Icon20Name,
  type Icon24Name,
  type Icon32Name,
} from "./icons";

export type IconName =
  | Icon12Name
  | Icon16Name
  | Icon20Name
  | Icon24Name
  | Icon32Name;
export type IconSize = 12 | 16 | 20 | 24 | 32;

/** 색은 토큰 text-* 유틸로 제어한다 (currentColor 기반). */
export type IconColor =
  | "current"
  | "fg"
  | "fg-muted"
  | "primary"
  | "danger"
  | "success"
  | "on-primary";

const SIZE_CLASS: Record<IconSize, string> = {
  12: "size-3", // 0.75rem = 12
  16: "size-4", // 1rem = 16
  20: "size-5", // 1.25rem = 20
  24: "size-6", // 1.5rem = 24
  32: "size-8", // 2rem = 32
};

const ICON_SET: Record<IconSize, Record<string, string>> = {
  12: ICON_12,
  16: ICON_16,
  20: ICON_20,
  24: ICON_24,
  32: ICON_32,
};

const COLOR_CLASS: Record<IconColor, string> = {
  current: "",
  fg: "text-fg",
  "fg-muted": "text-fg-muted",
  primary: "text-primary",
  danger: "text-danger",
  success: "text-success",
  "on-primary": "text-on-primary",
};

export interface IconProps {
  /** 아이콘 이름 (12/16 세트에 따라 사용 가능 범위가 다름) */
  name: IconName;
  /** 12 / 16 / 24 (기본 16) */
  size?: IconSize;
  /** 토큰 색 (기본 current — 부모 text 색 상속) */
  color?: IconColor;
  /** 지정 시 의미 있는 라벨로 노출, 미지정 시 장식용(aria-hidden) */
  title?: string;
  className?: string;
}

export function Icon({
  name,
  size = 16,
  color = "current",
  title,
  className,
}: IconProps) {
  const inner = ICON_SET[size][name];
  if (!inner) return null;

  const labelled = Boolean(title);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={[SIZE_CLASS[size], COLOR_CLASS[color], className]
        .filter(Boolean)
        .join(" ")}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
      dangerouslySetInnerHTML={{
        __html: (labelled ? `<title>${title}</title>` : "") + inner,
      }}
    />
  );
}
