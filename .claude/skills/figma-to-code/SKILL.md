---
name: figma-to-code
description: >-
  Figma 링크/노드를 토큰 기반 React+TS+Tailwind 컴포넌트로 구현하는 표준 절차.
  figma.com URL이 포함된 구현 요청, "이 Figma 디자인 만들어줘", "이 프레임 컴포넌트화"에 사용.
  Clarify→Reuse→Implement→Evaluate 시퀀스를 결정적으로 강제한다.
---

# /figma-to-code — Figma → 코드 표준 파이프라인

Figma 디자인을 코드로 옮기는 **순서를 보장**하는 스킬. 카파시 4원칙을 단계로 강제한다.
각 단계는 끝나야 다음으로 넘어간다. 한 단계라도 실패하면 **멈춘다.**

## 1. Clarify (원칙 1: Think Before Coding)

다음이 모두 명확하지 않으면 **멈추고 사용자에게 질문한다. 추측 금지.**

- [ ] Figma 링크/노드 — 어떤 프레임/컴포넌트인가
- [ ] 포함할 변형/상태(variant, hover/disabled 등)
- [ ] 출력 파일 경로 (예: `src/components/Button/Button.tsx`)
- [ ] **측정 가능한 완료 조건** (예: "3개 변형 렌더 + 스크린샷 일치 + 하드코딩 0")

## 2. Reuse (원칙 2: Simplicity First)

1. `figma-implementer` 에이전트로 디자인을 **실제로 읽는다**:
   `get_metadata` → `get_screenshot` → `get_design_context` → `get_variable_defs`.
2. 추출한 Figma 변수를 `src/tokens/design-tokens.css` 의 기존 토큰에 **매핑**한다.
3. 매핑 안 되는 값이 있으면 `token-guardian` 에 위임해 토큰을 먼저 추가한다.
   raw 값(hex/px)을 컴포넌트에 직접 쓰지 않는다 — hook이 차단한다.
4. 유사 컴포넌트가 이미 있으면 재사용한다. 요청 안 한 prop·옵션 추가 금지.

## 3. Implement (원칙 3: Surgical Changes)

- `figma-implementer` 가 **요청한 컴포넌트만** 만든다. 범위 밖 파일·리팩토링·import 정리 금지.
- 함수형 컴포넌트 + 명시적 props 타입. 토큰 기반 유틸리티만 사용.
- 같은 폴더에 스토리를 추가한다 — addon-designs의 `design` 파라미터로 Figma를 연결하고
  전역 autodocs로 문서가 자동 생성된다:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    design: { type: "figma", url: "<여기에 Figma 노드 URL>" }, // @storybook/addon-designs
  },
};
export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: { variant: "primary", children: "확인" },
};
```

## 4. Evaluate (원칙 4: Goal-Driven Execution)

`design-reviewer` 에이전트로 **게이트**를 통과해야 한다. 하나라도 FAIL이면 "미완료":

- [ ] 하드코딩 0 (hex/px/rgb/arbitrary Tailwind 없음)
- [ ] 모든 시각 값이 `src/tokens/design-tokens.css` 토큰 참조
- [ ] `npm run build` 통과
- [ ] `get_screenshot` 과 시각 일치
- [ ] 변경이 요청 범위와 1:1

통과 전에는 **"완료"라고 말하지 않는다.**

## 사용 에이전트

`figma-implementer` (읽기·구현) → `token-guardian` (토큰) → `design-reviewer` (검증)
