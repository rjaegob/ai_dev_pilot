import type { ReactNode } from "react";
import { IconButton } from "../Button/IconButton";

export interface PopupProps {
  /** 헤더 타이틀 */
  title: string;
  /** 닫기 버튼 클릭 핸들러 */
  onClose?: () => void;
  /** 팝업 본문 콘텐츠 */
  children: ReactNode;
  /** 표시 여부 — 기본 true */
  open?: boolean;
  /** 박스 너비(px) — 기본 720 */
  width?: number;
  className?: string;
}

export function Popup({
  title,
  onClose,
  children,
  open = true,
  width = 720,
  className,
}: PopupProps) {
  if (!open) return null;

  return (
    <div
      style={{ backgroundColor: "var(--color-overlay)" }}
      className="fixed inset-0 flex items-center justify-center"
    >
      <div
        style={{ boxShadow: "var(--shadow-3)", width }}
        className={[
          "flex max-h-[80vh] flex-col overflow-hidden rounded-xl bg-bg", // token-exempt: 뷰포트 비례 최대 높이(vh, px/색 아님) — 내부 스크롤용
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex items-center justify-between p-6">
          <span className="text-title1-bold text-fg">{title}</span>
          <IconButton icon="close" label="닫기" onClick={onClose} />
        </div>
        <div className="overflow-y-auto px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}
