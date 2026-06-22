---
name: review-design
description: >-
  컴포넌트/디자인 작업의 "완료"를 선언하기 전 검증 게이트를 실행하는 절차.
  "완료됐는지 검증", "리뷰해줘", 구현 직후 최종 점검에 사용.
  측정 가능한 기준만으로 Pass/Fail 을 판정한다.
---

# /review-design — Goal-Driven 검증 게이트

카파시 원칙 4(Goal-Driven Execution)의 최종 관문. **인상·추측이 아니라 측정**으로 판정한다.
다른 스킬(`figma-to-code`, `new-component`)의 마지막 단계로도 호출되고, 단독으로도 쓴다.

## 1. Clarify (원칙 1)

- [ ] 검증 대상 파일/컴포넌트
- [ ] **완료 조건**이 무엇인지 (불명확하면 요청자에게 확인)
- [ ] (있으면) 원본 Figma 디자인

## 2. Run — 체크리스트 측정 (원칙 4)

`design-reviewer` 에이전트가 각 항목을 **근거와 함께** 측정한다:

- [ ] **하드코딩 0** — `Grep` 으로 hex/px/rgb/arbitrary Tailwind 직접 확인
- [ ] **토큰 사용** — 모든 시각 값이 `src/tokens/design-tokens.css` 토큰 참조
- [ ] **요청 범위 일치** — 변경이 요청 항목과 1:1, 범위 밖 변경 없음
- [ ] **타입/빌드** — `npm run build` (tsc + vite) 통과
- [ ] **기본 a11y** — 시맨틱 태그, 인터랙티브 요소 라벨/role, 키보드 접근성
- [ ] **시각 일치** — Figma 작업이면 `get_screenshot` 과 대조

> 검증자는 **코드를 고치지 않는다.** 발견 사항을 리포트하고 수정은 담당 에이전트
> (`figma-implementer` / `component-builder` / `token-guardian`)로 돌려보낸다.

## 3. Verdict

```
판정: PASS / FAIL
- 항목별 결과(근거 포함)
- FAIL 시: 무엇이 / 어디서 / 왜 / 어느 에이전트로 보낼지
```

FAIL 항목이 하나라도 있으면 **절대 "완료"라고 말하지 않는다.**

## 사용 에이전트

`design-reviewer` (검증 전담)
