import type { ReactNode } from "react";
import { Button } from "../Button/Button";
import { TwoButton } from "../Button/TwoButton";

/**
 * Figma "Alert" variant 명칭과 1:1 매핑.
 * 각 variant 는 아래 config 로 {헤더 유무 · 아이콘 유무 · 버튼 수} 만 결정한다.
 * 본문(메시지/bullet/에러박스)은 children 으로 주입한다.
 */
export type AlertVariant =
  | "message"
  | "message-two-button"
  | "close-button"
  | "close-two-button"
  | "image"
  | "image-two-button"
  | "close-image"
  | "errorcase"
  | "errorcase2"
  | "bullet-list"
  | "bullet-list-2";

type VariantConfig = { header: boolean; icon: boolean; buttons: 1 | 2 };

const VARIANT_CONFIG: Record<AlertVariant, VariantConfig> = {
  message: { header: true, icon: false, buttons: 1 },
  "message-two-button": { header: true, icon: false, buttons: 2 },
  "close-button": { header: true, icon: false, buttons: 1 },
  "close-two-button": { header: true, icon: false, buttons: 2 },
  image: { header: false, icon: true, buttons: 1 },
  "image-two-button": { header: true, icon: true, buttons: 2 },
  "close-image": { header: false, icon: true, buttons: 1 },
  errorcase: { header: true, icon: false, buttons: 1 },
  errorcase2: { header: true, icon: false, buttons: 2 },
  "bullet-list": { header: true, icon: false, buttons: 2 },
  "bullet-list-2": { header: true, icon: false, buttons: 2 },
};

export interface AlertProps {
  /** Figma alert variant — 헤더/아이콘/버튼 수를 결정. 기본 message */
  variant?: AlertVariant;
  /** 헤더 타이틀 (header 있는 variant 에서 사용) */
  title?: string;
  /** 시스템 아이콘 슬롯 (w-14 h-14, icon variant 에서 사용) */
  icon?: ReactNode;
  /** 본문 콘텐츠 — 메시지/bullet 목록/에러박스 등 */
  children?: ReactNode;
  /** 우측 primary(확인) 버튼 라벨. 기본 '확인' */
  confirmLabel?: string;
  /** 좌측 secondary(취소) 버튼 라벨 — 2버튼 variant 에서 사용. 기본 '취소' */
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
}

/**
 * Alert — 확인 popup 카드(w-96). (오버레이는 사용하는 쪽에서 처리)
 * Figma "Alert" (node 4030-11567). 버튼 영역은 Button/TwoButton 을 재사용한다.
 */
export function Alert({
  variant = "message",
  title,
  icon,
  children,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
  className,
}: AlertProps) {
  const cfg = VARIANT_CONFIG[variant];

  return (
    <div
      style={{ boxShadow: "var(--shadow-3)" }}
      className={["flex w-96 flex-col gap-6 rounded-xl bg-bg pb-6", className]
        .filter(Boolean)
        .join(" ")}
    >
      {cfg.header && (
        <header className="px-6 pt-6 pb-4">
          <h2 className="text-title3-bold text-fg">{title}</h2>
        </header>
      )}

      <div
        className={[
          "flex flex-col gap-4",
          cfg.icon
            ? "items-center px-8 text-center"
            : "items-start px-6 text-start",
          cfg.header ? "" : "pt-6",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {cfg.icon && icon && (
          <div className="flex h-14 w-14 items-center justify-center">
            {icon}
          </div>
        )}
        <div className="text-body1-regular text-fg-muted">{children}</div>
      </div>

      <div className="px-6">
        {cfg.buttons === 2 ? (
          <TwoButton
            cancelLabel={cancelLabel}
            confirmLabel={confirmLabel}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        ) : (
          <Button variant="primary" className="w-full" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
