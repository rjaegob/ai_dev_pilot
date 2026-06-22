import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Popup } from "./Popup";
import { Label } from "../Label";
import { TableHeadCell } from "../Table/TableHeadCell";
import { TableDataCell } from "../Table/TableDataCell";

const meta = {
  title: "Composition/Popup",
  component: Popup,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 키/값 2칸 그리드 한 행: [라벨 셀, 값 셀] */
function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <TableHeadCell label={label} />
      <TableDataCell>{children}</TableDataCell>
    </>
  );
}

/** 소제목 + 키/값 그리드 섹션. cols=2 행을 [키 1fr / 값 2fr] 로 배치. */
function Section({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-title4-semibold text-fg">{heading}</h3>
      <div className="grid" style={{ gridTemplateColumns: "1fr 2fr" }}>
        {children}
      </div>
    </section>
  );
}

const detailText =
  "Model artifact download completed, Verification result: {'verifiers': {'sophos': {'success': True, 'infected_count': 0, 'scanned_count': 25}, 'v3': {'success': True, 'infected_count': 0, 'scanned_count': 25}}}";

/** MD_050102_P01 — "모델 검사 결과" 팝업 컴포지션 (mock 데이터) */
export const ModelInspectionResult: Story = {
  args: {
    title: "모델 검사 결과",
    onClose: () => {},
    children: (
      <div className="flex flex-col gap-6">
        <Section heading="외부망 백신점검 결과 요약">
          <Row label="백신 검사 결과">
            <Label color="blue">적합</Label>
          </Row>
          <Row label="검사한 파일 수">25</Row>
          <Row label="감염 파일 수">0</Row>
        </Section>

        <Section heading="내부망 백신점검 결과 요약">
          <Row label="백신 검사 결과">
            <Label color="blue">적합</Label>
          </Row>
          <Row label="백신 점검 내용">
            <Label color="red" hideIcon>
              V1.7
            </Label>
          </Row>
          <Row label="검사한 파일 수">25</Row>
          <Row label="감염 파일 수">0</Row>
        </Section>

        <Section heading="취약점점검 결과 요약">
          <Row label="취약점점검 결과">
            <Label color="blue">양호</Label>
          </Row>
          <Row label="발견된 취약점 수">0</Row>
          <Row label="취약점 심각도 별 파일 수">-</Row>
          <Row label="취약점 내용">-</Row>
        </Section>

        <Section heading="모델 점검 결과 상세">
          <Row label="백신 검사 결과">
            <span className="text-body2-regular text-fg-muted whitespace-pre-wrap break-all">
              {detailText}
            </span>
          </Row>
        </Section>
      </div>
    ),
  },
};
