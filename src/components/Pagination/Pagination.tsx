import { Icon } from "../Icon/Icon";

export interface PaginationProps {
  /** 현재 페이지 (1-based) */
  page: number;
  /** 전체 페이지 수 */
  total: number;
  /** 페이지 변경 시 새 페이지 번호 전달 */
  onChange?: (page: number) => void;
  className?: string;
}

/** 화살표 버튼 — 활성 greyscale-600 / 비활성(boundary) greyscale-400. 아이콘은 currentColor 상속. */
function ArrowButton({
  icon,
  label,
  disabled,
  onClick,
}: {
  icon: "left-double" | "small-left" | "small-right" | "right-double";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      style={{
        color: disabled
          ? "var(--color-greyscale-400)"
          : "var(--color-greyscale-600)",
      }}
      className="flex size-6 shrink-0 cursor-pointer items-center justify-center disabled:cursor-not-allowed"
    >
      <Icon name={icon} size={24} color="current" />
    </button>
  );
}

/**
 * 페이지네이션 (Figma 7122-29786 / 856-18202).
 * 좌측 처음·이전(<< <) + 페이지 번호 1..total + 우측 다음·마지막(> >>).
 * 활성 페이지: primary-800 / SemiBold, 비활성: greyscale-550 / Regular.
 * 색은 semantic 유틸이 없어 inline var() 로 참조(LineTab 패턴).
 */
export function Pagination({
  page,
  total,
  onChange,
  className,
}: PaginationProps) {
  const go = (next: number) => {
    const clamped = Math.min(Math.max(next, 1), total);
    if (clamped !== page) onChange?.(clamped);
  };

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav
      aria-label="페이지네이션"
      className={["flex items-center justify-center gap-2", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex shrink-0 items-center gap-2">
        <ArrowButton
          icon="left-double"
          label="처음 페이지"
          disabled={page <= 1}
          onClick={() => go(1)}
        />
        <ArrowButton
          icon="small-left"
          label="이전 페이지"
          disabled={page <= 1}
          onClick={() => go(page - 1)}
        />
      </div>

      <div className="flex shrink-0 items-center justify-center gap-2">
        {pages.map((p) => {
          const active = p === page;
          return (
            <button
              key={p}
              type="button"
              aria-label={`${p} 페이지`}
              aria-current={active ? "page" : undefined}
              onClick={() => go(p)}
              style={{
                color: active
                  ? "var(--color-primary-800)"
                  : "var(--color-greyscale-550)",
              }}
              className={[
                "flex h-8 shrink-0 cursor-pointer items-center justify-center px-2.5",
                active ? "text-body2-semibold" : "text-body2-regular",
              ].join(" ")}
            >
              {p}
            </button>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2">
        <ArrowButton
          icon="small-right"
          label="다음 페이지"
          disabled={page >= total}
          onClick={() => go(page + 1)}
        />
        <ArrowButton
          icon="right-double"
          label="마지막 페이지"
          disabled={page >= total}
          onClick={() => go(total)}
        />
      </div>
    </nav>
  );
}
