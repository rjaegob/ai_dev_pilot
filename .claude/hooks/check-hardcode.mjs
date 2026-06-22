#!/usr/bin/env node
// check-hardcode.mjs — PreToolUse 하드 블록.
// Edit/Write/MultiEdit 으로 들어오는 "쓰기 전" 내용을 스캔해서, 디자인 토큰 대신
// raw 색상/사이즈/arbitrary Tailwind 값이 있으면 exit 2 로 쓰기를 차단한다.
//
// 카파시 원칙 2(Simplicity First) + 토큰 규칙(CLAUDE.md)을 자동으로 강제한다.

import { readFileSync } from "node:fs";

function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

let payload;
try {
  payload = JSON.parse(readStdin() || "{}");
} catch {
  // 입력이 깨졌으면 차단하지 않는다(fail open).
  process.exit(0);
}

const toolInput = payload.tool_input || {};
const filePath = toolInput.file_path || "";

// 코드/스타일 파일만 스캔한다.
if (!/\.(tsx|jsx|ts|js|css)$/.test(filePath)) process.exit(0);

// 토큰 단일 진실 공급원(SSOT)은 raw 값 허용.
if (/design-tokens\.css$|\.tokens\.css$/.test(filePath)) process.exit(0);

// Write(content) / Edit(new_string) / MultiEdit(edits[].new_string) 의 신규 내용 수집.
let text = "";
if (typeof toolInput.content === "string") text += toolInput.content + "\n";
if (typeof toolInput.new_string === "string")
  text += toolInput.new_string + "\n";
if (Array.isArray(toolInput.edits)) {
  for (const e of toolInput.edits) {
    if (e && typeof e.new_string === "string") text += e.new_string + "\n";
  }
}
if (!text.trim()) process.exit(0);

const RULES = [
  {
    name: "hex 색상",
    re: /#[0-9a-fA-F]{3,8}\b/,
    hint: "var(--color-*) 토큰을 쓰세요",
  },
  {
    name: "rgb/hsl 리터럴",
    re: /\b(?:rgb|rgba|hsl|hsla)\(/,
    hint: "var(--color-*) 토큰을 쓰세요",
  },
  {
    name: "raw px 값",
    re: /\b\d+(?:\.\d+)?px\b/,
    hint: "var(--spacing-*) / --radius-* / --text-* 토큰을 쓰세요",
  },
  {
    name: "arbitrary Tailwind 값",
    re: /\b(?:bg|text|border|fill|stroke|ring|outline|divide|from|via|to|w|h|min-w|max-w|min-h|max-h|size|p[xytrbl]?|m[xytrbl]?|gap|space-[xy]|inset|top|bottom|left|right|rounded|shadow|leading|tracking|z|opacity)-\[[^\]]+\]/,
    hint: "토큰 기반 유틸리티(예: bg-primary, p-4, rounded-md)를 쓰세요",
  },
];

const lines = text.split("\n");
const violations = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes("token-exempt")) continue; // 문서화된 escape hatch
  for (const rule of RULES) {
    const m = line.match(rule.re);
    if (m)
      violations.push({
        line: i + 1,
        value: m[0],
        rule: rule.name,
        hint: rule.hint,
      });
  }
}

if (violations.length === 0) process.exit(0);

const header = `❌ 하드코딩된 디자인 값이 감지되어 쓰기를 차단했습니다 (${filePath}).`;
const body = violations
  .map((v) => `  • "${v.value}" (${v.rule}) → ${v.hint}`)
  .join("\n");
const footer = [
  "",
  "카파시 원칙 2(Simplicity First) / 토큰 규칙 위반입니다.",
  "→ src/tokens/design-tokens.css 의 토큰을 재사용하세요.",
  "→ 필요한 토큰이 없으면 token-guardian 에이전트로 먼저 토큰을 추가하세요.",
  "→ 의도된 예외라면 해당 줄 끝에 `token-exempt: <사유>` 주석을 추가하세요.",
].join("\n");

process.stderr.write(`${header}\n${body}\n${footer}\n`);
process.exit(2);
