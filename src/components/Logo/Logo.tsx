import shinhan from "./assets/shinhan.png";
import llama from "./assets/llama.png";
import huggingface from "./assets/huggingface.png";
import mistral from "./assets/mistral.png";
import google from "./assets/google.png";
import cohere from "./assets/cohere.png";
import openai from "./assets/openai.png";
import meta from "./assets/meta.png";
import ax from "./assets/ax.png";
import globalai from "./assets/globalai.png";
import microsoft from "./assets/microsoft.png";
import anthropic from "./assets/anthropic.png";
import etc from "./assets/etc.png";
import shinhanSignature from "./assets/shinhan-signature.svg";

export type LogoName =
  | "shinhan"
  | "shinhan-signature"
  | "llama"
  | "huggingface"
  | "mistral"
  | "google"
  | "cohere"
  | "openai"
  | "meta"
  | "ax"
  | "globalai"
  | "microsoft"
  | "anthropic"
  | "etc";

export type LogoSize = 16 | 24 | 32;

/** wide: 가로 lockup(시그니처) — 정사각 대신 높이 기준 + 폭 auto 로 비율 보존 */
const LOGOS: Record<LogoName, { src: string; label: string; wide?: boolean }> =
  {
    shinhan: { src: shinhan, label: "Shinhan" },
    "shinhan-signature": {
      src: shinhanSignature,
      label: "Shinhan Bank",
      wide: true,
    },
    llama: { src: llama, label: "Llama" },
    huggingface: { src: huggingface, label: "Hugging Face" },
    mistral: { src: mistral, label: "Mistral" },
    google: { src: google, label: "Google" },
    cohere: { src: cohere, label: "Cohere" },
    openai: { src: openai, label: "Open AI" },
    meta: { src: meta, label: "Meta" },
    ax: { src: ax, label: "A.x" },
    globalai: { src: globalai, label: "Global AI" },
    microsoft: { src: microsoft, label: "Microsoft" },
    anthropic: { src: anthropic, label: "Anthropic" },
    etc: { src: etc, label: "etc" },
  };

/** 정사각 로고: size → Tailwind 스페이싱 유틸 (16=size-4, 24=size-6, 32=size-8) */
const SIZE_CLASS: Record<LogoSize, string> = {
  16: "size-4",
  24: "size-6",
  32: "size-8",
};

/** wide 로고: 높이만 size 로 고정하고 폭은 비율 자동(w-auto) */
const HEIGHT_CLASS: Record<LogoSize, string> = {
  16: "h-4",
  24: "h-6",
  32: "h-8",
};

export const LOGO_NAMES = Object.keys(LOGOS) as LogoName[];

export interface LogoProps {
  /** 표시할 로고 */
  name: LogoName;
  /** 표준 해상도 16 / 24 / 32 중 하나 (기본 24) */
  size?: LogoSize;
  className?: string;
}

export function Logo({ name, size = 24, className }: LogoProps) {
  const { src, label, wide } = LOGOS[name];
  const sizeClass = wide ? `${HEIGHT_CLASS[size]} w-auto` : SIZE_CLASS[size];
  return (
    <img
      src={src}
      alt={`${label} logo`}
      className={[sizeClass, className].filter(Boolean).join(" ")}
    />
  );
}
