---
name: new-component
description: >-
  Figma 없이 기존 토큰으로 React+TS+Tailwind 컴포넌트를 새로 만드는 표준 절차.
  "Card 컴포넌트 만들어줘", "Badge에 변형 추가", 코드 경로 컴포넌트 작업에 사용.
  Clarify→Reuse→Implement→Evaluate 시퀀스를 결정적으로 강제한다.
---

# /new-component — 코드 경로 컴포넌트 표준 절차

Figma 링크 없이 기존 디자인 토큰만으로 컴포넌트를 만드는 스킬.
`figma-to-code` 와 달리 디자인 읽기 단계가 없고, 토큰 재사용과 surgical 구현에 집중한다.

## 1. Clarify (원칙 1)

다음이 불명확하면 **멈추고 질문한다.**

- [ ] 컴포넌트 이름·역할
- [ ] props 와 변형/상태
- [ ] 출력 경로 (예: `src/components/Card/Card.tsx`)
- [ ] **측정 가능한 완료 조건**

## 2. Reuse (원칙 2)

- `src/tokens/design-tokens.css` 에서 쓸 토큰을 먼저 확인한다.
- 비슷한 기존 컴포넌트/유틸을 `Grep`/`Glob` 으로 찾아 재사용한다.
- 필요한 토큰이 없으면 `token-guardian` 으로 먼저 추가한다 (컴포넌트에 raw 값 금지).
- 요청 안 한 prop·옵션·추상화·제네릭 추가 금지. **가장 단순한 구현.**

## 3. Implement (원칙 3)

- `component-builder` 에이전트가 **요청 범위만** 구현한다. "겸사겸사" 수정 절대 금지.
- 토큰 기반 유틸리티만 사용 (예: `bg-surface text-fg p-md rounded-md`).
- 같은 폴더에 스토리(`*.stories.tsx`)를 추가한다 — 전역 autodocs로 문서 자동 생성.

## 4. Evaluate (원칙 4)

`design-reviewer` 게이트 통과 필수:

- [ ] 하드코딩 0
- [ ] 토큰 사용
- [ ] `npm run build` 통과
- [ ] 변경이 요청과 1:1, 범위 밖 변경 없음

통과 전 "완료" 금지.

## 사용 에이전트

`component-builder` (구현) → (토큰 부족 시 `token-guardian`) → `design-reviewer` (검증)
