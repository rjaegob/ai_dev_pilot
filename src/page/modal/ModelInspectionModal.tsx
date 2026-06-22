import type { ReactNode } from "react";
import { Icon } from "../../components/Icon/Icon";
import { Label } from "../../components/Label";
import { TableHeadCell, TableDataCell } from "../../components/Table";

/**
 * 모델 검사 결과 — Large 모달 (Figma 40000001-41787).
 * 디자인 시스템 토큰 + 기존 컴포넌트(Label / Table 셀 / Icon)만으로 구성한다.
 */
export interface ModelInspectionModalProps {
  /** 닫기(X) 버튼 클릭 핸들러 */
  onClose?: () => void;
  className?: string;
}

/** Divider 라인 색 greyscale-500 — semantic 유틸이 없어 inline var() 로 참조(Table 셀 패턴). */
const DIVIDER_STYLE = { backgroundColor: "var(--color-greyscale-500)" };

function Divider() {
  return <div style={DIVIDER_STYLE} className="h-px w-full shrink-0" />;
}

/** TH(고정폭) + TD(가변) 한 쌍. 행 안에서 flex-1 로 1열 또는 2열 분할에 모두 대응한다. */
function Pair({ head, children }: { head: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 items-stretch">
      {/* w-38 = TH 고정폭(38*4=152). h-auto! 로 셀 기본 h-12 를 풀어 행 높이에 맞춰 늘어남 */}
      <TableHeadCell className="h-auto! w-38 shrink-0 self-stretch">
        {head}
      </TableHeadCell>
      <TableDataCell className="min-w-0 flex-1 self-stretch">
        {children}
      </TableDataCell>
    </div>
  );
}

/** 섹션: 제목 + Divider + 행들. */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-3">
      <h3 className="text-title4-semibold text-fg">{title}</h3>
      <div className="flex w-full flex-col">
        <Divider />
        {children}
      </div>
    </section>
  );
}

/** 한 행(전체폭). 내부 Pair 들이 flex-1 로 균등 분할된다. */
function Row({ children }: { children: ReactNode }) {
  return <div className="flex w-full items-stretch">{children}</div>;
}

const DETAIL_VACCINE =
  "Model artifact download completed, Verification result: {'verifiers': {'sophos': {'success': True, 'infected_count': 0, 'scanned_at': '2025-12-11T07:07:14.811978+0000', 'scan_time': 0.126003, 'scanned_count': 25, 'metadata': {'scan_command': '/usr/local/bin/avscanner --scan-archives /home/lablup/temp-storage/google/gemma-3-27b-it/main'}, 'error': None}, 'v3': {'success': True, 'infected_count': 0, 'scanned_at': '2025-12-11T07:07:14.938581+0000', 'scan_time': 6.225144, 'scanned_count': 25, 'metadata': {'scan_command': 'action scan start directory /home/lablup/temp-storage/google/gemma-3-27b-it/main'}, 'error': None}, 'deepsecurity': {'success': True, 'infected_count': 0, 'scanned_at': '2025-12-11T07:07:14.811978+0000', 'scan_time': 0.126003, 'scanned_count': 25, 'metadata': {'scan_command': '/usr/local/bin/avscanner --scan-archives /home/lablup/temp-storage/google/gemma-3-27b-it/main'}, 'error': None}}}";

const DETAIL_VULN =
  'VULNERABILITY_CHECK { "total_vulnerabilities": 0, "vulnerabilities_by_severity": 0, "vulnerabilities": [] }';

export function ModelInspectionModal({
  onClose,
  className,
}: ModelInspectionModalProps) {
  return (
    <div
      style={{ width: "var(--layout-modal-lg-w)" }}
      className={["flex flex-col rounded-xl bg-bg", className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Header */}
      <div className="flex items-center gap-4 rounded-t-xl bg-bg px-10 pb-6 pt-8">
        <h2 className="min-w-0 flex-1 text-title1-bold text-fg">
          모델 검사 결과
        </h2>
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="flex shrink-0 cursor-pointer items-center justify-center text-fg"
        >
          <Icon name="close" size={24} title="닫기" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8 overflow-y-auto px-10">
        <Section title="외부망 백신점검 결과 요약">
          <Row>
            <Pair head="백신 검사 결과">
              <Label color="blue">적합</Label>
            </Pair>
          </Row>
          <Row>
            <Pair head="검사한 파일 수">25</Pair>
            <Pair head="감염 파일 수">0</Pair>
          </Row>
        </Section>

        <Section title="내부망 백신점검 결과 요약">
          <Row>
            <Pair head="백신 검사 결과">
              <Label color="blue">적합</Label>
            </Pair>
          </Row>
          <Row>
            <Pair head="백신 점검 내용">25</Pair>
          </Row>
        </Section>

        <Section title="취약점검 결과 요약">
          <Row>
            <Pair head="취약점검 결과">
              <Label color="blue">양호</Label>
            </Pair>
            <Pair head="발견된 취약점 수" />
          </Row>
          <Row>
            <Pair head="취약점 심각도 별 파일 수" />
            <Pair head="취약점 내용" />
          </Row>
        </Section>

        <Section title="모델 점검 결과 상세">
          <Row>
            <Pair head="백신 검사 결과">{DETAIL_VACCINE}</Pair>
          </Row>
          <Row>
            <Pair head="취약점검 결과">{DETAIL_VULN}</Pair>
          </Row>
        </Section>
      </div>

      {/* Bottom (Figma: 버튼 영역, 현 프레임은 비어 있음) */}
      <div className="h-30 shrink-0 rounded-b-xl bg-bg" />
    </div>
  );
}
