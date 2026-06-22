import type { CSSProperties, ReactNode } from "react";

/** 메타 헤더(상단) 필드 — 화면설계서 식별 정보. */
export interface DescriptionGuideMeta {
  /** 화면명 (예: 완료) */
  screenName: string;
  /** 화면 ID (예: LG_010102) */
  screenId: string;
  /** 화면타입 (예: React) */
  screenType: string;
  /** LOCATION 경로 (예: 로그인 > 완료) */
  location: string;
  /** 화면구분 (예: Page) */
  division: string;
}

/** 화면 위에 얹는 지시번호 마커 — Description 행 번호와 1:1 매핑. */
export interface DescriptionMarker {
  /** 지시번호 (1, 2, 3 …) — Description no 와 일치해야 함 */
  no: number;
  /** 마커 중심의 좌측 위치 (% 문자열, 예: '50%') */
  x: string;
  /** 마커 중심의 상단 위치 (% 문자열, 예: '38%') */
  y: string;
}

/** Description 한 행 안의 소제목 블록 (예: "1. 노출 조건" + 본문 줄들). */
export interface DescriptionSection {
  /** 굵은 소제목 (예: 1. 노출 조건 / 2. 출력 정보 / 1. 클릭 시) */
  heading: string;
  /** 본문 줄 목록 (예: '- 입력한 행번의 이름 출력', '1) 이름') */
  lines: string[];
}

/** Description 테이블 한 행 — 좌측 번호 + 우측 설명. */
export interface DescriptionRow {
  /** 행 번호 (예: '01') — 화면의 지시번호와 1:1 매핑 */
  no: string;
  /** 설명 대상명 (굵게, 예: '[Alert] 회원가입 완료', '[확인] 버튼') */
  target: string;
  /** 소제목 블록 목록 */
  sections: DescriptionSection[];
}

export interface DescriptionGuideProps {
  /** 상단 메타 헤더 정보 */
  meta: DescriptionGuideMeta;
  /** 좌측 화면 목업 (이미지 또는 라이브 컴포넌트) */
  screen: ReactNode;
  /** 화면 위 지시번호 마커 목록 */
  markers?: DescriptionMarker[];
  /** 우측 Description 행 목록 */
  rows: DescriptionRow[];
  /** 좌(화면):우(Description) 폭 비율 — 기본 [6, 4], 권장 범위 6:4 ~ 7:3 */
  ratio?: [number, number];
  /** 바깥 컨테이너 className */
  className?: string;
}

const textColor: CSSProperties = { color: "var(--dg-text)" };
const bodyColor: CSSProperties = { color: "var(--dg-text-body)" };

/** 메타 헤더의 라벨/값 한 쌍. */
function MetaPair({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-stretch">
      <div
        className="text-title4-semibold flex shrink-0 items-center px-3 py-4"
        style={{ ...textColor, width: "var(--dg-meta-label-w)" }}
      >
        {label}
      </div>
      <div
        className="text-body1-regular flex min-w-0 flex-1 items-center px-3 py-4"
        style={bodyColor}
      >
        {value}
      </div>
    </div>
  );
}

/**
 * DescriptionGuide — 화면설계서(디스크립션 가이드) 레이아웃 템플릿.
 *
 * 상단 메타 헤더 + 좌측 화면(지시번호 마커 오버레이) + 우측 Description 테이블.
 * 화면마다 props 만 바꿔 재사용한다. 화면의 지시번호 마커(no)와
 * Description 행(no)은 1:1 로 대응되어야 한다.
 */
export function DescriptionGuide({
  meta,
  screen,
  markers = [],
  rows,
  ratio = [6, 4],
  className,
}: DescriptionGuideProps) {
  const [screenFlex, descFlex] = ratio;
  return (
    <div
      className={["flex flex-col", className].filter(Boolean).join(" ")}
      style={{ backgroundColor: "var(--color-neutral-0)" }}
    >
      {/* ── 상단 메타 헤더 ── */}
      <div
        className="flex flex-col border-b-4 border-solid"
        style={{ borderColor: "var(--dg-rule)" }}
      >
        <div
          className="flex border-b border-solid"
          style={{ borderColor: "var(--dg-rule)" }}
        >
          <div className="flex-1">
            <MetaPair label="화면" value={meta.screenName} />
          </div>
          <div className="flex-1">
            <MetaPair label="화면 ID" value={meta.screenId} />
          </div>
          <div className="flex-1">
            <MetaPair label="화면타입" value={meta.screenType} />
          </div>
        </div>
        <div className="flex">
          <div className="flex-[2]">
            <MetaPair label="LOCATION" value={meta.location} />
          </div>
          <div className="flex-1">
            <MetaPair label="화면구분" value={meta.division} />
          </div>
        </div>
      </div>

      {/* ── 본문: 좌 화면 + 우 Description ── */}
      <div className="flex items-start gap-8 pt-6">
        {/* 좌: 화면 목업 + 지시번호 마커 */}
        <div
          className="relative min-w-0 border border-solid"
          style={{ flex: `${screenFlex} 1 0%`, borderColor: "var(--dg-line)" }}
        >
          {screen}
          {markers.map((m) => (
            <span
              key={m.no}
              aria-hidden
              className="text-body2-semibold absolute flex items-center justify-center rounded-full"
              style={{
                left: m.x,
                top: m.y,
                width: "var(--dg-marker-size)",
                height: "var(--dg-marker-size)",
                transform: "translate(-50%, -50%)",
                backgroundColor: "var(--dg-marker-bg)",
                color: "var(--dg-marker-fg)",
              }}
            >
              {m.no}
            </span>
          ))}
        </div>

        {/* 우: Description 패널 */}
        <div className="min-w-0" style={{ flex: `${descFlex} 1 0%` }}>
          <h2 className="text-headline2-semibold mb-4" style={textColor}>
            Description
          </h2>
          <div className="flex flex-col">
            {/* 헤더행 ❖ */}
            <div
              className="border-t-2 border-solid"
              style={{ borderColor: "var(--dg-line-strong)" }}
            >
              <DescriptionNoCell no="❖" />
            </div>
            {/* 데이터 행들 */}
            {rows.map((row) => (
              <DescriptionRowView key={row.no} row={row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 좌측 번호 셀 (회색 배경 + 우측 구분선). */
function DescriptionNoCell({ no }: { no: string }) {
  return (
    <div className="flex">
      <div
        className="text-title2-semibold flex shrink-0 items-start border-r border-solid px-3 py-4"
        style={{
          width: "var(--dg-desc-no-w)",
          backgroundColor: "var(--dg-no-bg)",
          borderColor: "var(--dg-line)",
          ...textColor,
        }}
      >
        {no}
      </div>
      <div className="min-w-0 flex-1" />
    </div>
  );
}

/** Description 데이터 행 — 번호 셀 + 설명 셀. */
function DescriptionRowView({ row }: { row: DescriptionRow }) {
  return (
    <div
      className="flex border-b border-solid"
      style={{ borderColor: "var(--dg-line)" }}
    >
      <div
        className="text-title2-semibold flex shrink-0 items-start border-r border-solid px-3 py-4"
        style={{
          width: "var(--dg-desc-no-w)",
          backgroundColor: "var(--dg-no-bg)",
          borderColor: "var(--dg-line)",
          ...textColor,
        }}
      >
        {row.no}
      </div>
      <div
        className="flex min-w-0 flex-1 flex-col gap-4 px-3 py-4"
        style={bodyColor}
      >
        <p className="text-body1-semibold">{row.target}</p>
        {row.sections.map((section, i) => (
          <div key={i} className="flex flex-col">
            <p className="text-body1-semibold">{section.heading}</p>
            {section.lines.map((line, j) => (
              <p key={j} className="text-body1-regular">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
