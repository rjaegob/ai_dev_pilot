---
name: sync-tokens
description: >-
  Figma 변수(Variables)를 src/tokens/design-tokens.css 의 디자인 토큰으로 동기화/추가하는 절차.
  "Figma 변수 동기화", "이 색/간격을 토큰으로", 토큰 추가가 필요할 때 사용.
  토큰 SSOT 외 파일은 절대 건드리지 않는다.
---

# /sync-tokens — Figma 변수 → 토큰 SSOT 동기화

Figma의 Variables를 `src/tokens/design-tokens.css` 의 `@theme` 토큰으로 옮기는 스킬.
**토큰 난립과 임의 덮어쓰기를 막는 것**이 핵심이다.

## 1. Clarify (원칙 1)

- [ ] 어떤 Figma 파일/변수 컬렉션을 동기화하는가
- [ ] 네이밍 규칙 확인 (`src/tokens/README.md` — 의미 기반 `--color-primary`)
- 값 충돌이 예상되면 먼저 정책을 묻는다.

## 2. Reuse (원칙 2)

- `token-guardian` 이 `get_variable_defs` 로 Figma 변수를 추출한다.
- **기존 토큰과 먼저 대조**한다. 의미가 같으면 신규 생성하지 말고 기존 토큰에 매핑한다.
- Figma 값과 기존 토큰 값이 **충돌하면 임의로 덮어쓰지 않고 사용자에게 확인**한다.

## 3. Implement (원칙 3)

- 추가/수정은 **`src/tokens/design-tokens.css` 한 파일에만** 한다. 다른 파일 금지.
- `@theme` 카테고리·네이밍 컨벤션을 그대로 따른다. 토큰 1개 = 1줄.
- 요청 범위 밖 토큰 재정렬·정리 금지.

```css
/* @theme 블록에 추가 예시 */
--color-accent: oklch(0.7 0.15 200); /* Figma: Color/Accent */
--spacing-2xl: 3rem; /* Figma: Space/2XL */
```

## 4. Evaluate (원칙 4)

- [ ] `@theme` 문법 유효, `npm run build` 통과
- [ ] 추가/매핑한 변수가 컴포넌트에서 참조 가능
- [ ] **리포트**: 동기화한 변수 수, 신규 추가 N개 / 기존 매핑 M개 / 충돌 K개

통과·리포트 전 "완료" 금지.

## 사용 에이전트

`token-guardian` (추출·매핑·추가, SSOT 단독 편집)
