import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "../Icon/Icon";

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  /** 선택 가능한 항목들 */
  options: DropdownOption[];
  /** 선택 값 (controlled) */
  value?: string;
  /** 초기 선택 값 (uncontrolled) */
  defaultValue?: string;
  /** 선택 변경 콜백 */
  onChange?: (value: string) => void;
  /** 미선택 시 표시할 안내 문구 */
  placeholder?: string;
  /** 오류 상태 — 테두리·메시지를 danger 토큰으로 */
  error?: boolean;
  /** error 시 트리거 아래에 노출할 메시지 */
  errorMessage?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /** 바깥 래퍼 className (폭 지정 등) */
  className?: string;
}

/** 상태 → 배경·테두리 색 토큰. 우선순위: error > open(focus) > 기본. */
function frameStyle(opts: {
  open: boolean;
  error: boolean;
  disabled: boolean;
  readOnly: boolean;
}) {
  const { open, error, disabled, readOnly } = opts;
  const backgroundColor =
    disabled || readOnly ? "var(--color-surface)" : "var(--color-neutral-0)";
  let borderColor = "var(--color-border)";
  if (open) borderColor = "var(--color-primary-800)";
  if (error) borderColor = "var(--color-danger)";
  return { backgroundColor, borderColor };
}

/** 선택 항목 글자색 — 선택/하이라이트 토큰. */
function itemColor(selected: boolean, highlighted: boolean) {
  if (selected) return "var(--color-primary-800)";
  if (highlighted) return "var(--color-greyscale-600)";
  return "var(--color-greyscale-500)";
}

export function Dropdown({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  error = false,
  errorMessage,
  disabled = false,
  readOnly = false,
  className,
}: DropdownProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(defaultValue);
  const [highlight, setHighlight] = useState(-1);

  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;
  const selectedOption = options.find((o) => o.value === selected);
  const interactive = !disabled && !readOnly;

  // 바깥 클릭 시 닫기
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  function openMenu() {
    const idx = options.findIndex((o) => o.value === selected);
    setHighlight(idx >= 0 ? idx : 0);
    setOpen(true);
  }

  function selectOption(option: DropdownOption) {
    if (!isControlled) setInternal(option.value);
    onChange?.(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (!interactive) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openMenu();
        else setHighlight((h) => Math.min(options.length - 1, h + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) setHighlight((h) => Math.max(0, h - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open && highlight >= 0) selectOption(options[highlight]);
        else openMenu();
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  }

  const triggerColor = disabled
    ? "var(--color-neutral-550)"
    : readOnly
      ? "var(--color-greyscale-700)"
      : selectedOption
        ? "var(--color-greyscale-800)"
        : "var(--color-neutral-550)";

  return (
    <div
      ref={rootRef}
      className={["relative flex flex-col", className]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() =>
          interactive ? (open ? setOpen(false) : openMenu()) : undefined
        }
        onKeyDown={onTriggerKeyDown}
        style={frameStyle({ open, error, disabled, readOnly })}
        className="flex h-10 items-center gap-2 rounded-md border border-solid px-3 py-2.5"
      >
        <span
          className="text-body2-regular min-w-0 flex-1 truncate text-left"
          style={{ color: triggerColor }}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <span
          className="flex shrink-0"
          style={{ color: "var(--color-greyscale-700)" }}
        >
          <Icon name="small-down" size={24} color="current" />
        </span>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          style={{
            backgroundColor: "var(--color-neutral-0)",
            borderColor: "var(--color-primary-800)",
          }}
          className="shadow-2 absolute top-full right-0 left-0 z-10 mt-1 max-h-64 overflow-y-auto rounded-md border border-solid p-1.5"
        >
          {options.map((option, idx) => {
            const isSelected = option.value === selected;
            const isHighlighted = idx === highlight;
            return (
              <li key={option.value} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlight(idx)}
                  onClick={() => selectOption(option)}
                  style={{
                    color: itemColor(isSelected, isHighlighted),
                    backgroundColor: isHighlighted
                      ? "var(--color-primary-100)"
                      : "transparent",
                  }}
                  className="text-body1-regular flex w-full items-center rounded-md px-4 py-2 text-left"
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}

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
