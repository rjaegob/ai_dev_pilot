# R-jaegob — 디자인 시스템 하네스

Figma 디자인 시스템을 코드(React + TypeScript + Tailwind v4 + Storybook 8)로 변환할 때
**일관성**을 보장하고 **토큰 하드코딩을 차단**하기 위한 하네스다.

---

## 🛑 카파시 4원칙 — 이 프로젝트의 모든 작업에 강제되는 법칙

> 아래 4원칙은 권고가 아니라 **법칙**이다. 모든 에이전트의 단계와 hook이 이를 강제한다.
> 위반하면 작업은 "완료"가 아니다.

### 1. Think Before Coding — 코딩 전 되물어보기

- **문제:** 잘못된 가정으로 달려가 오류를 낸다.
- **적용:** 요청이 모호하면 **멈추고 질문**한다. 추측을 사실처럼 말하지 않는다.
  모르는 것은 "모른다"고 하고 확인한다. Figma 링크/노드/요구사항이 불명확하면 진행하지 않는다.

### 2. Simplicity First — 50줄로 줄일 수 있으면 다시 써라

- **문제:** 100줄이면 될 걸 1000줄로 부풀린다.
- **적용:** 새로 만들기 **전에 기존 토큰·컴포넌트를 먼저 검색하고 재사용**한다.
  요청하지 않은 추상화·옵션·prop·유틸을 추가하지 않는다. 가장 단순한 구현을 택한다.

### 3. Surgical Changes — 변경 줄과 요청을 1:1 추적

- **문제:** 요청하지 않은 코드까지 건드린다.
- **적용:** 요청 범위 **밖의 리팩토링·포맷 변경·import 정리를 금지**한다.
  변경된 모든 줄은 요청과 직접 연결되어야 한다. "겸사겸사" 수정 금지.

### 4. Goal-Driven Execution — 검증 가능한 성공 기준

- **문제:** 작업이 끝났는지 판단할 기준이 없다.
- **적용:** 모든 작업은 **측정 가능한 완료 조건**으로 시작하고 끝난다.
  Evaluate 단계에서 자체 검증을 통과하기 전에는 "완료"를 선언하지 않는다.

---

## 표준 워크플로 — 모든 작업은 4단계를 거친다

각 단계는 위 원칙 하나에 대응한다. 에이전트든 메인 루프든 이 순서를 따른다.

| 단계             | 대응 원칙             | 해야 할 일                                                                                |
| ---------------- | --------------------- | ----------------------------------------------------------------------------------------- |
| **1. Clarify**   | Think Before Coding   | 요청·범위·완료 조건을 명확히 한다. 모호하면 질문하고 멈춘다.                              |
| **2. Reuse**     | Simplicity First      | 기존 토큰(`src/tokens/design-tokens.css`)·컴포넌트를 먼저 검색. 재사용 우선, 신규 최소화. |
| **3. Implement** | Surgical Changes      | 요청 범위만 변경. 모든 변경 줄을 요청에 매핑할 수 있어야 함.                              |
| **4. Evaluate**  | Goal-Driven Execution | 완료 조건을 측정 가능하게 검증. 통과 전 "완료" 금지.                                      |

---

## 토큰 규칙 (하드 룰 — hook이 강제)

- 색·간격·반경·타이포·그림자 등 **모든 시각 값은 `src/tokens/design-tokens.css` 의 토큰만 사용**한다.
- **금지:** raw hex(`#3B82F6`), `rgb()/hsl()` 리터럴, raw `px` 값, arbitrary Tailwind 값(`bg-[#fff]`, `w-[16px]`).
- 필요한 토큰이 없으면 **`token-guardian` 에이전트로 먼저 토큰을 추가**한 뒤 사용한다.
- PreToolUse hook(`.claude/hooks/check-hardcode.mjs`)이 위 위반을 **exit 2로 하드 블록**한다.
- 의도된 예외는 해당 줄 끝에 `token-exempt: <사유>` 주석으로만 허용된다 (남용 금지).

---

## 기술 스택 & 컨벤션

- **React + TypeScript** — 함수형 컴포넌트, 명시적 props 타입.
- **Tailwind v4** — CSS-first `@theme`. 디자인 토큰이 단일 진실 공급원(SSOT).
- **Storybook 8** — 컴포넌트는 스토리와 함께 제공. addon-designs로 Figma 연결, 전역 autodocs.
- 스캐폴드 완료: `npm run dev / build / storybook / build-storybook`.

---

## 에이전트 라우팅 가이드

| 상황                                                        | 에이전트            |
| ----------------------------------------------------------- | ------------------- |
| Figma 링크/노드를 받아 코드로 구현                          | `figma-implementer` |
| 하드코딩 감지·토큰 매핑·Figma 변수 → 토큰 동기화/추가       | `token-guardian`    |
| Figma 없이 기존 토큰으로 컴포넌트 신규/변형/리팩토링        | `component-builder` |
| 완료 선언 전 검증 게이트 (하드코딩 0, 토큰 사용, 범위 일치) | `design-reviewer`   |

> 모든 에이전트는 필요 시 **Figma MCP를 직접 사용**할 수 있다.

---

## 스킬 가이드

스킬은 **표준 절차(슬래시 커맨드)** 다. 에이전트가 "역할 담당자"라면, 스킬은 그 역할들을
`Clarify → Reuse → Implement → Evaluate` **순서로 결정적으로 묶는** 진입점이다.

| 상황                                   | 스킬             | 묶는 에이전트                                          |
| -------------------------------------- | ---------------- | ------------------------------------------------------ |
| Figma 링크/노드를 코드로 구현          | `/figma-to-code` | figma-implementer → token-guardian → design-reviewer   |
| Figma 없이 토큰으로 컴포넌트 생성/변형 | `/new-component` | component-builder → (token-guardian) → design-reviewer |
| Figma 변수 → 토큰 SSOT 동기화          | `/sync-tokens`   | token-guardian                                         |
| 완료 선언 전 검증 게이트               | `/review-design` | design-reviewer                                        |

> 에이전트 = 누가(역할), 스킬 = 어떤 순서로(절차). 절차를 보장하려면 스킬로 시작한다.
