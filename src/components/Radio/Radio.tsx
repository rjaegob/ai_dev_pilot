import {
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

/**
 * checked × disabled → 링(원) 배경/보더 색 토큰(var 참조).
 *  - Figma 의 selected blue 는 --color-primary(brand) 가 아니라 primitive --color-primary-800.
 *  - semantic 유틸이 없는 primitive 가 다수라 Button.tsx 의 colorVars() 와 동일하게 inline var() 로 참조한다.
 */
function ringStyle(
  checked: boolean,
  disabled: boolean,
): { backgroundColor: string; borderColor: string } {
  if (disabled) {
    return checked
      ? {
          backgroundColor: "var(--color-neutral-0)",
          borderColor: "var(--color-primary-300)",
        }
      : {
          backgroundColor: "var(--color-neutral-100)",
          borderColor: "var(--color-greyscale-300)",
        };
  }
  return checked
    ? {
        backgroundColor: "var(--color-neutral-0)",
        borderColor: "var(--color-primary-800)",
      }
    : {
        backgroundColor: "var(--color-neutral-0)",
        borderColor: "var(--color-greyscale-550)",
      };
}

/** 선택 시 내부 점 색 — disabled 면 옅은 톤(primary-300) */
function dotColor(disabled: boolean): string {
  return disabled ? "var(--color-primary-300)" : "var(--color-primary-800)";
}

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** 선택 상태(controlled). 지정 시 외부에서 제어 */
  checked?: boolean;
  /** 초기 선택 상태(uncontrolled) */
  defaultChecked?: boolean;
  /** 비활성화 — 기본 false */
  disabled?: boolean;
  /** 라벨 텍스트 — 지정 시 라디오 우측에 노출 */
  label?: ReactNode;
  /** 선택 변경 콜백 */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Radio({
  checked,
  defaultChecked = false,
  disabled = false,
  label,
  onChange,
  className,
  ...rest
}: RadioProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internal;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternal(event.target.checked);
    onChange?.(event);
  }

  return (
    <label
      className={[
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        type="radio"
        className="sr-only"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />
      {/* 디자인의 24 컨테이너 → size-6, 보더는 border-width 토큰이 없어 Tailwind border 사용 */}
      <span
        aria-hidden
        style={ringStyle(isChecked, disabled)}
        className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-solid"
      >
        {isChecked && (
          <span
            style={{ backgroundColor: dotColor(disabled) }}
            className="size-3 rounded-full"
          />
        )}
      </span>
      {label != null && (
        <span className="text-body1-regular text-fg-muted">{label}</span>
      )}
    </label>
  );
}
