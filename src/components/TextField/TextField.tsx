import {
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
} from "react";
import { Icon } from "../Icon/Icon";

export type TextFieldVariant = "input" | "search";

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /** input(기본) / search(앞에 검색 아이콘) */
  variant?: TextFieldVariant;
  /** 오류 상태 — 테두리·메시지를 danger 토큰으로 */
  error?: boolean;
  /** error 시 필드 아래에 노출할 메시지 */
  errorMessage?: string;
  /** 바깥 래퍼 className (폭 지정 등) */
  containerClassName?: string;
}

/** 상태 → 배경·테두리 색 토큰. 우선순위: error > focus > 기본. */
function frameStyle(opts: {
  focused: boolean;
  error: boolean;
  disabled: boolean;
  readOnly: boolean;
}) {
  const { focused, error, disabled, readOnly } = opts;
  const backgroundColor =
    disabled || readOnly ? "var(--color-surface)" : "var(--color-neutral-0)";
  let borderColor = "var(--color-border)";
  if (focused) borderColor = "var(--color-primary-800)";
  if (error) borderColor = "var(--color-danger)";
  return { backgroundColor, borderColor };
}

/** 입력 값 글자색 — 상태별 토큰. */
function valueColor(disabled: boolean, readOnly: boolean) {
  if (disabled) return "var(--color-neutral-550)";
  if (readOnly) return "var(--color-greyscale-700)";
  return "var(--color-greyscale-800)";
}

export function TextField({
  variant = "input",
  error = false,
  errorMessage,
  disabled = false,
  readOnly = false,
  placeholder,
  defaultValue,
  value,
  className,
  containerClassName,
  onChange,
  onFocus,
  onBlur,
  ...rest
}: TextFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(
    Boolean((defaultValue ?? value ?? "").toString().length),
  );

  const showClear = !disabled && !readOnly && hasValue;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setHasValue(e.target.value.length > 0);
    onChange?.(e);
  }
  function handleFocus(e: FocusEvent<HTMLInputElement>) {
    setFocused(true);
    onFocus?.(e);
  }
  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    setFocused(false);
    onBlur?.(e);
  }
  function handleClear() {
    const el = inputRef.current;
    if (!el) return;
    el.value = "";
    setHasValue(false);
    el.focus();
  }

  return (
    <div
      className={["flex flex-col", containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        style={frameStyle({ focused, error, disabled, readOnly })}
        className="flex h-10 items-center gap-2 rounded-md border border-solid px-3 py-2.5"
      >
        {variant === "search" && (
          <span
            className="flex shrink-0"
            style={{ color: "var(--color-greyscale-500)" }}
          >
            <Icon name="search" size={24} color="current" />
          </span>
        )}

        <div className="relative flex min-w-0 flex-1 items-center">
          <input
            ref={inputRef}
            disabled={disabled}
            readOnly={readOnly}
            defaultValue={defaultValue}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              color: valueColor(disabled, readOnly),
              caretColor: "var(--color-greyscale-900)",
            }}
            className={[
              "text-body2-regular w-full bg-transparent outline-none",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...rest}
          />
          {!hasValue && placeholder && (
            <span
              aria-hidden
              className="text-body2-regular pointer-events-none absolute inset-0 flex items-center"
              style={{ color: "var(--color-neutral-550)" }}
            >
              {placeholder}
            </span>
          )}
        </div>

        {showClear && (
          <button
            type="button"
            aria-label="입력 내용 지우기"
            onClick={handleClear}
            className="flex shrink-0"
            style={{ color: "var(--color-greyscale-500)" }}
          >
            <Icon name="clear" size={24} color="current" />
          </button>
        )}
      </div>

      {error && errorMessage && (
        <p
          className="text-body2-regular pt-1 pl-3"
          style={{ color: "var(--color-danger)" }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
