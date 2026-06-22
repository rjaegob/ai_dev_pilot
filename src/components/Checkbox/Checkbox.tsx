import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";

/**
 * checked × disabled → 박스 배경/보더/체크 색 토큰(var 참조).
 *  - Figma 의 selected blue 는 --color-primary(brand) 가 아니라 primitive --color-primary-800.
 *  - semantic 유틸이 없는 primitive 가 다수라 Button.tsx 의 colorVars() 와 동일하게 inline var() 로 참조한다.
 *  - 체크색은 박스의 `color` 로 주고 <Icon color="current"> 가 상속한다(4상태 모두 체크 글리프 렌더).
 */
function boxStyle(
  checked: boolean,
  disabled: boolean,
): { backgroundColor: string; borderColor: string; color: string } {
  if (disabled) {
    return checked
      ? {
          backgroundColor: "var(--color-primary-300)",
          borderColor: "transparent",
          color: "var(--color-text-white)",
        }
      : {
          backgroundColor: "var(--color-neutral-100)",
          borderColor: "var(--color-greyscale-300)",
          color: "var(--color-greyscale-300)",
        };
  }
  return checked
    ? {
        backgroundColor: "var(--color-primary-800)",
        borderColor: "var(--color-primary-800)",
        color: "var(--color-text-white)",
      }
    : {
        backgroundColor: "var(--color-neutral-0)",
        borderColor: "var(--color-greyscale-550)",
        color: "var(--color-greyscale-550)",
      };
}

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** 선택 상태(controlled). 지정 시 외부에서 제어 */
  checked?: boolean;
  /** 초기 선택 상태(uncontrolled) */
  defaultChecked?: boolean;
  /** 비활성화 — 기본 false */
  disabled?: boolean;
  /** 선택 변경 콜백 */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  className,
  ...rest
}: CheckboxProps) {
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
        className="sr-only"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />
      {/* 디자인의 24 컨테이너 내 22 박스 → size-6 로 단일화. 보더는 border-width 토큰이 없어 Tailwind border 사용 */}
      <span
        aria-hidden
        style={boxStyle(isChecked, disabled)}
        className="inline-flex size-6 items-center justify-center rounded-sm border border-solid"
      >
        <Icon name="check" size={24} />
      </span>
    </label>
  );
}
