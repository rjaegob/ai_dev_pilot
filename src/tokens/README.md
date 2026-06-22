# Design Tokens

`design-tokens.css` 는 이 프로젝트의 **단일 진실 공급원(SSOT)** 이다.
모든 시각 값(색·간격·반경·타이포·그림자)은 여기 정의된 토큰으로만 표현한다.

## 핵심 규칙

1. **raw 값 금지.** 컴포넌트/스타일에 `#3B82F6`, `16px`, `rgb(...)`, `bg-[#fff]`, `w-[16px]`
   같은 값을 직접 쓰지 않는다. → `.claude/hooks/check-hardcode.mjs` 가 쓰기를 **하드 블록**한다.
2. **토큰 추가는 `token-guardian` 경유.** 필요한 토큰이 없으면 임의로 raw 값을 쓰지 말고
   `token-guardian` 에이전트로 토큰을 먼저 추가한 뒤 사용한다.
3. **예외는 명시적으로.** 의도된 raw 값은 해당 줄 끝에 `token-exempt: <사유>` 주석으로만 허용된다.

## 네이밍 컨벤션

Tailwind v4 `@theme` 네임스페이스를 그대로 따른다.

| 카테고리       | prefix                    | 사용처                               |
| -------------- | ------------------------- | ------------------------------------ |
| 색상           | `--color-*`               | `var(--color-primary)`, `bg-primary` |
| 간격           | (Tailwind v4 기본 스케일) | `p-4`, `gap-6` (4px 단위 숫자 유틸)  |
| 반경           | `--radius-*`              | `rounded-md`                         |
| 타이포(폰트)   | `--font-*`                | `font-sans`                          |
| 타이포(크기)   | `--text-*`                | `text-base`                          |
| 그림자         | `--shadow-*`              | `shadow-md`                          |
| 브레이크포인트 | `--breakpoint-*`          | 반응형 분기                          |

- 의미 기반 이름을 쓴다(`--color-primary`, `--color-danger`) — 값 기반(`--color-blue-500`) 지양.
- 토큰 한 개 = 한 줄. 정렬·그룹은 위 카테고리 주석 블록을 따른다.

## Figma 변수 동기화

Figma 변수는 `token-guardian` 이 `get_variable_defs` 로 추출해 이 파일의 토큰에 매핑/추가한다.
값이 충돌하면 임의로 덮어쓰지 말고 사용자에게 확인한다(카파시 원칙 1).
