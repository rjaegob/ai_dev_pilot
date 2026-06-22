# Design Tokens — Figma 매핑

Figma "공유\_Design Style Guide" → 코드 토큰 매핑 테이블.
추출: `get_variable_defs`. 변환 규칙: Figma 변수명 `/` → CSS `-`, Primitive → Semantic 참조 구조.

| 카테고리           | 파일                                            | 상태                          |
| ------------------ | ----------------------------------------------- | ----------------------------- |
| 색상               | `src/tokens/colors.tokens.css`                  | ✅ 완료 (node 6642-26084)     |
| 스페이싱           | (Tailwind v4 기본 스케일)                       | ✅ 표준 채택 — 별도 토큰 없음 |
| 타이포그래피       | `src/tokens/typography.tokens.css` (`@utility`) | ✅ 완료 (node 6642-26106)     |
| 레이아웃           | `src/tokens/layout.tokens.css`                  | ✅ 완료 (node 6642-26836)     |
| 라디우스/그림자    | `src/tokens/effects.tokens.css`                 | ✅ 완료 (node 6642-47599)     |
| 라디우스/그림자 등 | `src/tokens/design-tokens.css`                  | ⏳ 베이스라인                 |

---

## 색상 (node 6642-26084)

### Primitive (`:root`, 참조 전용)

| Figma 변수                                                      | 토큰                               | 값          |
| --------------------------------------------------------------- | ---------------------------------- | ----------- |
| 00 Brand color / shinhan blue, Primary color/Brand/Shinhan blue | `--color-brand-shinhan-blue`       | `#0046FF`   |
| Primary color/Primary/100                                       | `--color-primary-100`              | `#EFF5FF`   |
| Primary color/Primary/200                                       | `--color-primary-200`              | `#E5EEFF`   |
| Primary color/Primary/300                                       | `--color-primary-300`              | `#CDE0FF`   |
| Primary color/Primary/400                                       | `--color-primary-400`              | `#9DC1FF`   |
| Primary color/Primary/500                                       | `--color-primary-500`              | `#689EFF`   |
| Primary color/Primary/600                                       | `--color-primary-600`              | `#4A86FF`   |
| Primary color/Primary/700                                       | `--color-primary-700`              | `#2670FF`   |
| Primary color/Primary/800                                       | `--color-primary-800`              | `#005DF9`   |
| Primary color/Primary/900                                       | `--color-primary-900`              | `#0047E7`   |
| 02 Greyscale/200                                                | `--color-greyscale-200`            | `#E7EDF6`   |
| 02 Greyscale/300                                                | `--color-greyscale-300`            | `#DCE2ED`   |
| 02 Greyscale/400                                                | `--color-greyscale-400`            | `#C7CEDC`   |
| 02 Greyscale/500                                                | `--color-greyscale-500`            | `#8B95A9`   |
| 02 Greyscale/550                                                | `--color-greyscale-550`            | `#7E889B`   |
| 02 Greyscale/600                                                | `--color-greyscale-600`            | `#576072`   |
| 02 Greyscale/700                                                | `--color-greyscale-700`            | `#373E4D`   |
| 02 Greyscale/800                                                | `--color-greyscale-800`            | `#242A34`   |
| 02 Greyscale/900                                                | `--color-greyscale-900`            | `#121315`   |
| Secondary color/Neutral/0                                       | `--color-neutral-0`                | `#FFFFFF`   |
| Secondary color/Neutral/100                                     | `--color-neutral-100`              | `#F3F6FB`   |
| Secondary color/Neutral/550                                     | `--color-neutral-550`              | `#7E889B`   |
| Grey Scale/600                                                  | `--color-grey-600`                 | `#5F6372`   |
| Grey Scale/800                                                  | `--color-grey-800`                 | `#30323B`   |
| Grey Scale/900                                                  | `--color-grey-900`                 | `#101116`   |
| Semantic color/State/Red                                        | `--color-state-red`                | `#D61111`   |
| Semantic/Green                                                  | `--color-state-green`              | `#158463`   |
| Semantic color/Label color/Purple/Deep                          | `--color-label-purple-deep`        | `#9336FF`   |
| Semantic color/Label color/Green/Deep                           | `--color-label-green-deep`         | `#008479`   |
| Semantic color/Label color/Orange/Deep                          | `--color-label-orange-deep`        | `#FF4512`   |
| Semantic color/Label color/Neutral/Light gray                   | `--color-label-neutral-light-gray` | `#CECECE`   |
| Semantic color/Gauge/Blue                                       | `--color-gauge-blue`               | `#368DED`   |
| Semantic color/Gauge/Green                                      | `--color-gauge-green`              | `#37D8D0`   |
| Semantic color/Gauge/Purple                                     | `--color-gauge-purple`             | `#8166D2`   |
| Text/Text White                                                 | `--color-text-white`               | `#FFFFFF`   |
| Semantic color/Dimmed color/Dim color (60%)                     | `--color-dim`                      | `#00000099` |

### Semantic (`@theme`, Tailwind 유틸 생성)

| 토큰                    | 참조 Primitive               | 값          | 유틸 예                  |
| ----------------------- | ---------------------------- | ----------- | ------------------------ |
| `--color-primary`       | `--color-brand-shinhan-blue` | `#0046FF`   | `bg-primary`             |
| `--color-primary-hover` | `--color-primary-900`        | `#0047E7`   | `hover:bg-primary-hover` |
| `--color-secondary`     | `--color-greyscale-600`      | `#576072`   | `bg-secondary` ⚠️        |
| `--color-bg`            | `--color-neutral-0`          | `#FFFFFF`   | `bg-bg`                  |
| `--color-surface`       | `--color-neutral-100`        | `#F3F6FB`   | `bg-surface`             |
| `--color-border`        | `--color-greyscale-300`      | `#DCE2ED`   | `border-border`          |
| `--color-fg`            | `--color-greyscale-900`      | `#121315`   | `text-fg`                |
| `--color-fg-muted`      | `--color-greyscale-600`      | `#576072`   | `text-fg-muted`          |
| `--color-on-primary`    | `--color-text-white`         | `#FFFFFF`   | `text-on-primary`        |
| `--color-danger`        | `--color-state-red`          | `#D61111`   | `text-danger`            |
| `--color-success`       | `--color-state-green`        | `#158463`   | `text-success`           |
| `--color-overlay`       | `--color-dim`                | `#00000099` | `bg-overlay`             |

---

## 해석 메모 (⚠️)

`get_variable_defs` 는 변수 alias 체인(semantic → primitive)을 노출하지 않으므로 일부 semantic 매핑은 합리적 추정이다.

1. **두 그레이 컬렉션 공존** — `02 Greyscale`(→`greyscale-*`)과 `Grey Scale`(→`grey-*`)는 레벨이 겹치지만 hex 가 달라 별도 그룹으로 보존.
2. **동일값 중복** — `Neutral/550` 과 `02 Greyscale/550` 모두 `#7E889B`. Figma 변수가 둘 다 존재하므로 양쪽 이름 유지.
3. **`--color-secondary`** — Figma 에 역할 미명시. `greyscale-600` 으로 잠정 매핑. 추후 가이드에서 정정 가능.

---

## 타이포그래피 (node 6642-26106)

합성 토큰 → Tailwind v4 `@utility` 클래스. 전부 `font-family: var(--font-sans)`(Pretendard), `letter-spacing: -0.03125rem`(≡ -0.5px @ root).
클래스명: Clean 시맨틱(중복 접두사/`pt` 제거, 오타 `Caprion`→`caption`·`Regualr`→`regular` 정정, weight 풀워드).
단위: px → rem(÷16).

| Figma Text Style                 | @utility 클래스           | size / weight / line-height |
| -------------------------------- | ------------------------- | --------------------------- |
| Heading/Headline1/28pt/Bold      | `text-headline1-bold`     | 28 / 700 / 40               |
| Heading/Headline1/28pt/SemiBold  | `text-headline1-semibold` | 28 / 600 / 40               |
| Heading/Headline 2/Product/26 SB | `text-headline2-product`  | 26 / 600 / 36               |
| Heading/Headline 2/24 B          | `text-headline2-bold`     | 24 / 700 / 34               |
| Heading/Headline 2/24 SB         | `text-headline2-semibold` | 24 / 600 / 34               |
| Title/Title1/22pt/Bold           | `text-title1-bold`        | 22 / 700 / 32               |
| Heading/Title 1/22 SB            | `text-title1-semibold`    | 22 / 600 / 32               |
| Title/Title2/20pt/Bold           | `text-title2-bold`        | 20 / 700 / 28               |
| Heading/Title 2/20 SB            | `text-title2-semibold`    | 20 / 600 / 28               |
| Heading/Title 3/18 B             | `text-title3-bold`        | 18 / 700 / 26               |
| Heading/Title 3/18 SB            | `text-title3-semibold`    | 18 / 600 / 26               |
| Heading/Title 4/16 B             | `text-title4-bold`        | 16 / 700 / 24               |
| Heading/Title 4/16 SB            | `text-title4-semibold`    | 16 / 600 / 24               |
| Body/Body 1/16 SB                | `text-body1-semibold`     | 16 / 600 / 24               |
| Body/Body 1/16 R                 | `text-body1-regular`      | 16 / 400 / 24               |
| Body/Body 2/14 SB                | `text-body2-semibold`     | 14 / 600 / 20               |
| Body/Body 2/14 R                 | `text-body2-regular`      | 14 / 400 / 20               |
| Body/Body3/13pt/SemiBold         | `text-body3-semibold`     | 13 / 600 / 20               |
| Body/Body3/13pt/Regualr          | `text-body3-regular`      | 13 / 400 / 20               |
| Caption/Caprion 1/13 SB          | `text-caption1-semibold`  | 13 / 600 / 20               |
| Caption/Caprion 1/13 R           | `text-caption1-regular`   | 13 / 400 / 20               |
| Caption/Caprion 2/12 SB          | `text-caption2-semibold`  | 12 / 600 / 20               |
| Caption/Caprion 2/12 R           | `text-caption2-regular`   | 12 / 400 / 20               |

### 타이포 메모 (⚠️)

- **값 중복(역할별 별도 유지)**: `title4-semibold`==`body1-semibold`(16/600/24), `body3-*`==`caption1-*`(13). Figma 스타일이 둘 다 존재하므로 각각 클래스 생성.
- **font-family**: 전부 Pretendard → `design-tokens.css` 의 `--font-sans` 를 `"Pretendard", …` 로 갱신. **Pretendard 웹폰트 로드는 별도 단계**(미설치 시 fallback 렌더).
- 이 노드에 섞여 있던 컬러 변수(`BG/Sub page #F8F8FA`, `Text/Text Black #222428`, `Line2 #E1E3E9` 등)는 타이포 범위 밖이라 미반영.

---

## 레이아웃 (node 6642-26836)

PC_1920(1920×1080) 기준 구조 규칙. 고정 영역 폭·간격을 `:root` CSS 변수로 등록. 컴포넌트는 `var(--layout-*)` 참조.

| 영역/간격          | 토큰                       | 값                                   |
| ------------------ | -------------------------- | ------------------------------------ |
| 기준 뷰포트        | `--layout-viewport-w`      | `1920px`                             |
| Header 높이        | `--layout-header-h`        | `70px`                               |
| LNB 폭             | `--layout-lnb-w`           | `272px` (Fixed)                      |
| LNB 최대폭         | `--layout-lnb-max-w`       | `306px`                              |
| Filter 폭          | `--layout-filter-w`        | `320px` (Fixed)                      |
| Filter 변형폭      | `--layout-filter-alt-w`    | `272px`                              |
| Step 폭(Popup)     | `--layout-step-w`          | `270px` (Fixed)                      |
| 컬럼 간격          | `--layout-col-gap`         | `48px`                               |
| 본문 상·하 여백    | `--layout-content-inset-y` | `40px`                               |
| 본문 기준폭(2컬럼) | `--layout-content-w`       | `calc(1920 − 272 − 48×2)` = `1552px` |

### 레이아웃 4종

1. **PC-Main(로그인 전)** — Header + 전체폭 Contents (LNB 없음, 풀블리드)
2. **PC-Main** — Header + LNB(272) + Contents(1552) — 기본 2컬럼
3. **PC-Main_filter** — + Filter(320) — 3컬럼
4. **Layer Popup** — Dimmed 배경 + Step(270) + Contents(가변)

### 레이아웃 메모

- 고정 영역은 px 고정값(레이아웃 chrome). 본문은 가변 — `--layout-content-w` 는 2컬럼 기준폭(참고용).
- 노드에 섞여 있던 컬러/타이포 변수는 레이아웃 범위 밖이라 미반영.

---

## 라디우스 / 그림자 (node 6642-47599 · Layer style)

`@theme` 등록 → Tailwind 유틸 생성. 라디우스 px, 그림자 색상은 8자리 hex(알파).

### Radius

| @theme 토큰     | 값       | 유틸           | 용도                           |
| --------------- | -------- | -------------- | ------------------------------ |
| `--radius-sm`   | `4px`    | `rounded-sm`   | ≤40px 버튼                     |
| `--radius-md`   | `8px`    | `rounded-md`   | 버튼·작은 카드 공통            |
| `--radius-lg`   | `12px`   | `rounded-lg`   | 기본 카드·셰이프               |
| `--radius-xl`   | `16px`   | `rounded-xl`   | 바텀시트·메인카드              |
| `--radius-full` | `9999px` | `rounded-full` | pill/원형 (Figma 스펙 외 유틸) |

### Drop Shadow (콘텐츠 위계별)

| @theme 토큰  | box-shadow                         | 유틸       | 역할                                  |
| ------------ | ---------------------------------- | ---------- | ------------------------------------- |
| `--shadow-1` | `0 -4px 20px #00000014` (black 8%) | `shadow-1` | Contents_main: 서브페이지 콘텐츠 박스 |
| `--shadow-2` | `0 2px 6px #1625421A` (navy 10%)   | `shadow-2` | Card_main: 기본 카드                  |
| `--shadow-3` | `0 0 8px #1625420F` (navy 6%)      | `shadow-3` | Card_sub: 팝업·보조 카드              |
| `--shadow-4` | `0 7px 25px #0000004D` (black 30%) | `shadow-4` | Card_contents                         |

### 메모 (⚠️)

- **그림자 값 소스**: #1·#4는 변수 정의와 화면 주석이 충돌 → **화면 주석(이 스펙 페이지) 우선**으로 확정(사용자). #2·#3은 양쪽 동일.
  - 참고로 변수 정의값: #1 `0 4px 20px`(Y 부호 반대), #4 `4px 4px 8px #D7D7D7`(불투명 회색). 채택 안 함.
- 색상 hue 는 변수 정의 사용(navy `#162542`, black). 화면 주석엔 알파%만 표기.
- `design-tokens.css` 의 베이스라인 radius/shadow 블록은 제거(포인터 주석만).

---

## 스페이싱 (Tailwind v4 표준)

Figma 에 별도 스페이싱 정의가 없어, **Tailwind v4 기본 스케일을 표준으로 채택**(사용자 확정).

- 기준 단위 `--spacing: 0.25rem`(=4px) — 프레임워크 기본값, 별도 토큰/파일 없음.
- 숫자 유틸 자동 생성: `p-1`=4px · `p-2`=8px · `p-3`=12px · `p-4`=16px · `gap-6`=24px · `m-8`=32px …
- arbitrary 값이 아니라 **hook 통과**. `p-[16px]` 같은 임의값은 금지(hook 차단) → 숫자 유틸 사용.
- 기존 t-shirt 토큰(`--spacing-xs`~`2xl`)은 제거(컨벤션 단일화).
- 레이아웃 고정 폭·간격(헤더 70 / LNB 272 / gap 48 등)은 `layout.tokens.css`(`--layout-*`) 별도 관리.

## 완료 요약

색상 · 타이포 · 레이아웃 · 라디우스/그림자 · 스페이싱(표준 채택) 모두 반영 완료.
