import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";

export type ToggleSize = "md" | "sm";

/** size → 트랙/썸 크기 토큰 유틸. 트랙 내부폭 = 썸폭이라 켜짐 이동은 translate-x-full 로 정확히 일치 */
const SIZE_CLASS: Record<ToggleSize, { track: string; thumb: string }> = {
  md: { track: "w-11 h-6", thumb: "size-5" }, // 44×24, thumb 20
  sm: { track: "w-9 h-5", thumb: "size-4" }, // 36×20, thumb 16
};

/**
 * checked × disabled × size → 트랙 배경 색 토큰(var 참조).
 *  - Figma 의 selected blue 는 --color-primary(brand) 가 아니라 primitive --color-primary-800.
 *  - unselected 트랙은 size 별로 다름: md=greyscale-500, sm=greyscale-550 (Figma 명세).
 *  - semantic 유틸이 없는 primitive 가 다수라 Button.tsx 의 colorVars() 와 동일하게 inline var() 로 참조한다.
 */
function trackColor(
  checked: boolean,
  disabled: boolean,
  size: ToggleSize,
): string {
  if (disabled) {
    return checked ? "var(--color-primary-300)" : "var(--color-greyscale-300)";
  }
  if (checked) return "var(--color-primary-800)";
  return size === "sm"
    ? "var(--color-greyscale-550)"
    : "var(--color-greyscale-500)";
}

export interface ToggleProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** 크기 — md(46) / sm(38). 기본 md */
  size?: ToggleSize;
  /** 켜짐 상태(controlled). 지정 시 외부에서 제어 */
  checked?: boolean;
  /** 초기 켜짐 상태(uncontrolled) */
  defaultChecked?: boolean;
  /** 비활성화 — 기본 false */
  disabled?: boolean;
  /** 켜짐 변경 콜백 */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Toggle({
  size = "md",
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  className,
  ...rest
}: ToggleProps) {
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
        "inline-flex",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        type="checkbox"
        role="switch"
        className="sr-only"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />
      <span
        aria-hidden
        style={{ backgroundColor: trackColor(isChecked, disabled, size) }}
        className={[
          "inline-flex items-center rounded-full p-0.5",
          SIZE_CLASS[size].track,
        ].join(" ")}
      >
        <span
          className={[
            "block rounded-full bg-bg shadow-2 transition-transform",
            SIZE_CLASS[size].thumb,
            isChecked ? "translate-x-full" : "translate-x-0",
          ].join(" ")}
        />
      </span>
    </label>
  );
}
