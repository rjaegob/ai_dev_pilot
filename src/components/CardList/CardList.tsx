import type { ChangeEvent, ReactNode } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { Icon, type IconName } from "../Icon/Icon";

export type CardBadgeTone = "success" | "danger" | "info" | "neutral";

export interface CardBadge {
  /** 배지 텍스트 (이용가능, 퇴사, Lastest.1 …) */
  label: string;
  /** 색 톤 — 기본 neutral */
  tone?: CardBadgeTone;
  /** 앞에 붙는 아이콘 (state 배지용) */
  icon?: IconName;
}

export interface CardListRow {
  /** 좌측 라벨 (고정폭 76) */
  label: string;
  /** 우측 내용 — 한 줄 말줄임 */
  content: ReactNode;
}

export interface CardListProps {
  /** 타이틀 — 최대 2줄 노출 */
  title: string;
  /** 설명문구 — 최대 1줄 (des on) */
  description?: string;
  /** 좌측 체크박스 노출 */
  selectable?: boolean;
  /** 체크 상태 (controlled) */
  checked?: boolean;
  /** 체크 변경 콜백 */
  onCheckedChange?: (checked: boolean) => void;
  /** 우측 더보기(⋮) 버튼 노출 (more on) */
  showMore?: boolean;
  /** 더보기 클릭 콜백 */
  onMoreClick?: () => void;
  /** 상태/라벨 배지 목록 (usage=state·label) */
  badges?: CardBadge[];
  /** 진행률 0–100 — 지정 시 프로그레스 바 노출 (usage=progress) */
  progress?: number;
  /** 라벨/내용 행 목록 (row=N) */
  rows?: CardListRow[];
  /** 바깥 컨테이너 className (폭 지정 등) */
  className?: string;
}

/** 배지 톤 → 배경·글자·테두리 색 토큰. */
function badgeStyle(tone: CardBadgeTone): {
  backgroundColor: string;
  color: string;
  borderColor?: string;
} {
  switch (tone) {
    case "success":
      return {
        backgroundColor: "var(--color-primary-300)",
        color: "var(--color-primary-800)",
      };
    case "danger":
      return {
        backgroundColor: "var(--color-label-red-mid)",
        color: "var(--color-label-red-deep)",
      };
    case "info":
      return {
        backgroundColor: "var(--color-primary-100)",
        color: "var(--color-primary-800)",
      };
    case "neutral":
    default:
      return {
        backgroundColor: "var(--color-neutral-100)",
        color: "var(--color-greyscale-900)",
        borderColor: "var(--color-greyscale-300)",
      };
  }
}

function Badge({ label, tone = "neutral", icon }: CardBadge) {
  const { backgroundColor, color, borderColor } = badgeStyle(tone);
  const weight = icon ? "text-caption2-semibold" : "text-caption2-regular";
  return (
    <span
      style={{ backgroundColor, color, borderColor }}
      className={[
        "inline-flex h-6 items-center gap-1 rounded-sm px-1.5",
        borderColor ? "border border-solid" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && <Icon name={icon} size={16} color="current" />}
      <span className={`${weight} whitespace-nowrap`}>{label}</span>
    </span>
  );
}

export function CardList({
  title,
  description,
  selectable = false,
  checked,
  onCheckedChange,
  showMore = false,
  onMoreClick,
  badges,
  progress,
  rows,
  className,
}: CardListProps) {
  const hasBadges = Boolean(badges && badges.length > 0);
  const hasProgress = progress !== undefined && progress !== null;
  const hasRows = Boolean(rows && rows.length > 0);
  const pct = hasProgress ? Math.min(100, Math.max(0, progress as number)) : 0;

  function handleCheckChange(e: ChangeEvent<HTMLInputElement>) {
    onCheckedChange?.(e.target.checked);
  }

  return (
    <div
      style={{
        backgroundColor: "var(--color-neutral-0)",
        borderColor: "var(--color-border)",
      }}
      className={[
        "flex flex-col gap-6 rounded-xl border border-solid p-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── 상단: 타이틀 행 + 배지 ── */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-start gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-2">
            {selectable && (
              <Checkbox
                className="shrink-0 pt-0.5"
                checked={checked}
                onChange={handleCheckChange}
              />
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p
                className="text-title3-semibold line-clamp-2 w-full break-words"
                style={{ color: "var(--color-greyscale-700)" }}
              >
                {title}
              </p>
              {description && (
                <p
                  className="text-body1-regular line-clamp-1 w-full break-words"
                  style={{ color: "var(--color-greyscale-600)" }}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
          {showMore && (
            <button
              type="button"
              aria-label="더보기"
              onClick={onMoreClick}
              className="flex shrink-0 items-center"
              style={{ color: "var(--color-greyscale-900)" }}
            >
              <Icon name="overflow" size={24} color="current" />
            </button>
          )}
        </div>

        {hasBadges && (
          <div className="flex w-full flex-wrap items-center gap-1">
            {badges!.map((badge, i) => (
              <Badge key={`${badge.label}-${i}`} {...badge} />
            ))}
          </div>
        )}
      </div>

      {/* ── 프로그레스 ── */}
      {hasProgress && (
        <div className="flex w-full items-center gap-3">
          <div
            className="h-1 min-w-0 flex-1 overflow-hidden rounded-md"
            style={{ backgroundColor: "var(--color-primary-300)" }}
          >
            <div
              className="h-1 rounded-md"
              style={{
                width: `${pct}%`,
                backgroundColor: "var(--color-primary-700)",
              }}
            />
          </div>
          <span
            className="text-body3-regular w-10 text-right"
            style={{ color: "var(--color-text-body)" }}
          >
            {pct}%
          </span>
        </div>
      )}

      {/* ── 라벨/내용 목록 ── */}
      {hasRows && (
        <div className="flex w-full flex-col gap-1">
          {rows!.map((row, i) => (
            <div
              key={`${row.label}-${i}`}
              className="flex w-full items-center gap-3"
            >
              <span
                className="text-body2-regular w-19 shrink-0"
                style={{ color: "var(--color-greyscale-600)" }}
              >
                {row.label}
              </span>
              <span
                className="text-body1-regular min-w-0 flex-1 truncate"
                style={{ color: "var(--color-greyscale-700)" }}
              >
                {row.content}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
