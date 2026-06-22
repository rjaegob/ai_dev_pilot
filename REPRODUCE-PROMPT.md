# 하네스 재현 프롬프트 (빈 폴더 → 현재 하네스)

빈 폴더에서 Claude Code에 아래 프롬프트를 그대로 주면 지금과 동일한 디자인 시스템 하네스가 재현된다.
한 번에 줘도 되고, `===` 단위 단계로 나눠 줘도 된다(단계로 주면 중간 검토가 쉬움).

---

## 마스터 프롬프트 (한 번에)

```
디자인 시스템 하네스를 0부터 만들어줘. Figma 디자인 시스템을 코드로 변환할 때
일관성 보장 / 토큰 하드코딩 자동 차단 / 컴포넌트 구현 프로세스 표준화가 목적이야.
기술 스택: Vite 6 + React 19 + TypeScript 5 + Tailwind CSS v4 + Storybook 8(+ addon-designs + autodocs).

## 관통 원칙 — 안드레이 카파시 4원칙 (CLAUDE.md 최상단에 "법칙"으로 명시 + 에이전트/hook이 실제 강제)
1. Think Before Coding: 잘못된 가정 방지. 모호하면 멈추고 질문, 추측을 사실처럼 말하지 말 것.
2. Simplicity First: 부풀리기 방지. 새로 만들기 전 기존 토큰/컴포넌트 재사용, 요청 안 한 추상화·옵션 금지.
3. Surgical Changes: 범위 밖 변경 금지. 변경된 모든 줄이 요청과 1:1로 추적돼야 함.
4. Goal-Driven Execution: 완료 기준 필수. 측정 가능한 조건으로 끝나고, 자체 검증 통과 전 "완료" 금지.
→ 4원칙을 3중 레이어로 강제: CLAUDE.md(선언) → 에이전트 단계(절차) → hook(자동 차단).

## 1) CLAUDE.md
- 최상단에 4원칙 전문(문제+적용).
- 표준 워크플로: 모든 작업은 Clarify→Reuse→Implement→Evaluate 4단계(각 단계=원칙 1~4).
- 토큰 규칙: 모든 시각 값은 src/tokens 토큰만 사용. raw hex/px/rgb/arbitrary Tailwind 금지.
- 에이전트 라우팅 표 + 스킬 가이드 표(에이전트=역할 / 스킬=절차).

## 2) 역할 분리 에이전트 4개 (.claude/agents/*.md, 각각 Clarify→Reuse→Implement→Evaluate 강제, 전부 Figma MCP 직접 사용 가능)
- figma-implementer: Figma 링크/노드 → Figma MCP(get_metadata/get_screenshot/get_design_context/get_variable_defs)로 읽어 컴포넌트 구현.
- token-guardian: 하드코딩 감지·토큰 매핑·Figma 변수→토큰 동기화/추가. 토큰 파일만 편집.
- component-builder: Figma 없이 기존 토큰으로 컴포넌트 생성/변형. Surgical 엄격.
- design-reviewer: 완료 전 검증 게이트(하드코딩0/토큰사용/범위일치/빌드/a11y/스크린샷). 코드 수정 안 함, PASS/FAIL 판정.

## 3) 하드코딩 차단 hook (하드 블록)
- .claude/hooks/check-hardcode.mjs (Node, 의존성 0, stdin JSON 파싱).
- .claude/settings.json 의 PreToolUse, matcher "Edit|Write|MultiEdit" 로 등록.
- .tsx/.jsx/.ts/.js/.css 만 스캔. 감지: hex(#xxxxxx), rgb/hsl(), raw px, arbitrary Tailwind(bg-[...] 등).
- 감지 시 exit 2 로 차단 + "어떤 값→어느 토큰" 안내.
- 예외: design-tokens.css 및 *.tokens.css(토큰 SSOT) 파일, 그리고 줄 끝 `token-exempt: <사유>` 주석.

## 4) 표준 절차 스킬 4개 (.claude/skills/<name>/SKILL.md, Clarify→Reuse→Implement→Evaluate 시퀀스를 결정적으로 묶고 해당 에이전트 호출)
- /figma-to-code: figma-implementer→token-guardian→design-reviewer. (addon-designs design 파라미터 + autodocs 스토리 예시 포함)
- /new-component: component-builder→(token-guardian)→design-reviewer.
- /sync-tokens: token-guardian (Figma 변수→토큰 SSOT, SSOT 단독 편집).
- /review-design: design-reviewer 검증 게이트 단독 실행.

## 5) 토큰 토대 (단일 진실 공급원)
- src/tokens/design-tokens.css 에 Tailwind v4 @theme 블록으로 color/spacing/radius/typography/shadow/breakpoint 중립 기본 세트.
- 카테고리별로 src/tokens/*.tokens.css 분리 가능(hook이 .tokens.css 면제). src/index.css 에서 import.
- src/tokens/README.md 에 네이밍 컨벤션(의미 기반) + raw 값 금지 규칙.

## 6) 프로젝트 스캐폴드
- Vite 6 + React 19 + TS 5: package.json / vite.config.ts(@vitejs/plugin-react + @tailwindcss/vite) / tsconfig.json(+app,node) / index.html / src/main.tsx / src/App.tsx(토큰 기반) / src/index.css(@import "tailwindcss" + 토큰) / src/vite-env.d.ts / .gitignore.
- Storybook 8: storybook init 후 addon-designs 설치, .storybook/main.ts 에 등록, .storybook/preview.ts 에 `import '../src/index.css'` + `tags:['autodocs']`. boilerplate 예제 스토리와 addon-onboarding은 제거(토큰 하네스와 충돌).

## 진행 방식
- 코드 짜기 전에 플랜을 먼저 보여주고 승인받아.
- 마지막에 검증: hook을 가짜 입력으로 직접 테스트(하드코딩→exit2, 토큰→exit0, SSOT/.tokens.css 면제→exit0),
  settings.json JSON 유효성, `npm run build` 와 `npm run build-storybook` 통과까지 확인하고 보고해.
- 검증 통과 전 "완료" 선언 금지.
```

---

## 단계로 나눠 줄 때 (선택)

위 마스터 프롬프트의 섹션을 이 순서로 끊어서 주면 된다:

1. **`=== 1단계: 하네스 ===`** — 위 "관통 원칙 + 1)~5)" (CLAUDE.md / 에이전트 4 / hook / 스킬 4 / 토큰 토대). "플랜 먼저, 승인 후 구현, hook 가짜입력 테스트로 검증"까지.
2. **`=== 2단계: 프로젝트 초기화 ===`** — 위 "6) 프로젝트 스캐폴드". "이미 있는 파일(CLAUDE.md, .claude/, src/tokens/)은 건드리지 마. 끝나면 build / build-storybook 으로 검증."

---

## 재현 핵심 5요소 (이게 빠지면 결과가 달라짐)

1. **검증 가능한 목적** — "일관성/자동 차단/표준화"를 측정 가능한 동사로.
2. **문제→적용 쌍으로 준 4원칙** — 원칙마다 "막는 문제 + 강제 방식"을 같이.
3. **"실제로 강제하도록" + 3중 레이어** 명시 — 문서 권고로 끝나지 않게.
4. **범위 4축 결정** — 에이전트 분리 / 스캐폴드 범위 / hook 하드블록 / Figma MCP 직접 사용.
5. **검증 요구로 마무리** — hook 테스트 + build/build-storybook 통과 = 완료 기준.
