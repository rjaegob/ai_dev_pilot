import { Header } from "../../components/Header/Header";
import { Lnb, type LnbSection } from "../../components/Lnb/Lnb";
import { LnbRail, type LnbRailMenuItem } from "../../components/Lnb/LnbRail";
import { LineTab } from "../../components/LineTab/LineTab";
import { TextField } from "../../components/TextField/TextField";
import { Dropdown } from "../../components/TextField/Dropdown";
import { Button } from "../../components/Button/Button";
import { Label, type LabelColor } from "../../components/Label/Label";
import { TableHeaderCell } from "../../components/Table/TableHeaderCell";
import { TableCell } from "../../components/Table/TableCell";
import { Pagination } from "../../components/Pagination/Pagination";
import { Icon } from "../../components/Icon/Icon";

/* ── LNB 1-depth 아이콘 레일 (273-36843 항목) ───────────────────────── */
const RAIL_ITEMS: LnbRailMenuItem[] = [
  { value: "home", label: "홈", icon: "home" },
  { value: "data", label: "데이터", icon: "data" },
  { value: "model", label: "모델", icon: "model" },
  { value: "prompt", label: "프롬프트", icon: "prompt" },
  { value: "agent", label: "에이전트", icon: "agent" },
  { value: "assessment", label: "평가", icon: "assessment" },
  { value: "deployment", label: "배포", icon: "develop" },
  { value: "log", label: "로그", icon: "log" },
  { value: "notice", label: "공지사항", icon: "notice" },
  { value: "management", label: "관리", icon: "management" },
];

/* ── LNB 2-depth 섹션 (모델 / 최근 이용 메뉴) ──────────────────────── */
const LNB_SECTIONS: LnbSection[] = [
  {
    label: "모델",
    items: [
      { value: "model-explore", label: "모델 탐색", icon: "model-modelgarden" },
      { value: "model-manage", label: "모델 관리", icon: "model-catalog" },
      { value: "finetuning", label: "파인튜닝", icon: "finetuning" },
      { value: "playground", label: "플레이그라운드", icon: "playground" },
    ],
  },
  {
    label: "최근 이용 메뉴",
    items: [
      { value: "model-deploy", label: "모델 배포", icon: "model-deployment" },
      { value: "notice", label: "공지사항", icon: "notice" },
      { value: "data-storage", label: "데이터 저장소", icon: "data-storage" },
      { value: "data-catalog", label: "데이터 카탈로그", icon: "data-catalog" },
    ],
  },
];

/* ── 검색 필터: 상태 드롭다운 옵션 ────────────────────────────────── */
const STATUS_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "before", label: "반입전" },
  { value: "available", label: "이용가능" },
  { value: "importing", label: "반입중" },
  { value: "paying", label: "결제중" },
  { value: "unavailable", label: "이용불가" },
];

/* ── 페이지당 건수 옵션 ──────────────────────────────────────────── */
const PAGE_SIZE_OPTIONS = [
  { value: "12", label: "12개씩 보기" },
  { value: "24", label: "24개씩 보기" },
  { value: "48", label: "48개씩 보기" },
];

/* ── 상태 라벨 → Label 색 매핑 ───────────────────────────────────── */
const STATUS_LABEL: Record<string, LabelColor> = {
  이용가능: "blue",
  이용불가: "red",
  반입중: "green",
  반입전: "yellow",
};

/* ── 그리드 표 행 데이터 (스크린샷 99건 중 1페이지) ───────────────── */
interface ModelRow {
  name: string;
  status: keyof typeof STATUS_LABEL;
  desc: string;
  size: string;
}
const ROWS: ModelRow[] = [
  {
    name: "LiquidAI/LFM2-VL-1.6B",
    status: "이용가능",
    desc: "LiquidAI/LFM2-VL-1.6B 설명",
    size: "13.2GB",
  },
  {
    name: "llama-2-7b-chat",
    status: "이용가능",
    desc: "Meta's Llama 2 Chat model with 7 billion parameters",
    size: "13.2GB",
  },
  {
    name: "Qwen/Qwen-Image-Edit",
    status: "이용불가",
    desc: "Qwen/Qwen-Image-Edit 설명",
    size: "13.2GB",
  },
  {
    name: "deepseek-ai/DeepSeek-V3.1-Base",
    status: "이용불가",
    desc: "deepseek-ai/DeepSeek-V3.1-Base 설명",
    size: "13.2GB",
  },
  {
    name: "google/gemma-3-270m",
    status: "반입중",
    desc: "google/gemma-3-270m 설명",
    size: "13.2GB",
  },
  {
    name: "tencent/Hunyuan-GameCraft-1.0",
    status: "이용가능",
    desc: "tencent/Hunyuan-GameCraft-1.0 설명",
    size: "13.2GB",
  },
  {
    name: "google/gemma-3-270m-it",
    status: "이용가능",
    desc: "google/gemma-3-270m-it 설명",
    size: "13.2GB",
  },
  {
    name: "openai/gpt-oss-20b",
    status: "반입전",
    desc: "openai/gpt-oss-20b 설명",
    size: "13.2GB",
  },
  {
    name: "AIDC-AI/Ovis2.5-9B",
    status: "이용가능",
    desc: "AIDC-AI/Ovis2.5-9B 설명",
    size: "13.2GB",
  },
  {
    name: "Qwen/Qwen-Image",
    status: "반입전",
    desc: "Qwen/Qwen-Image 설명",
    size: "13.2GB",
  },
  {
    name: "nvidia/canary-1b-v2",
    status: "이용가능",
    desc: "nvidia/canary-1b-v2 설명",
    size: "13.2GB",
  },
  {
    name: "nvidia/canary-1b-v2",
    status: "이용가능",
    desc: "nvidia/canary-1b-v2 설명",
    size: "13.2GB",
  },
];

/* 표 컬럼 폭 — Figma 56/272/120/(flex)/120/120 → Tailwind 스페이싱 유틸 */
const COL_NO = "w-14";
const COL_NAME = "w-68";
const COL_STATUS = "w-30";
const COL_DESC = "flex-1 min-w-0";
const COL_SIZE = "w-30";
const COL_IMPORT = "w-30";

/**
 * MD_050101 — 모델 탐색 페이지 (Figma 4030-8896).
 * Header(GNB) + LNB(레일+2depth) + 본문(타이틀·탭·검색필터·그리드표·페이지네이션)을
 * 디자인 시스템 컴포넌트와 토큰만으로 조립한다.
 */
export function MD_050101() {
  return (
    <div
      className="flex h-screen flex-col"
      style={{
        width: "var(--layout-viewport-w)",
        backgroundColor: "var(--color-bg)",
      }}
    >
      <Header
        type="pcMainOn"
        breadcrumb={["모델", "모델 탐색"]}
        projectName="Public"
      />

      <div className="flex min-h-0 flex-1">
        <LnbRail items={RAIL_ITEMS} value="model" />
        <Lnb sections={LNB_SECTIONS} value="model-explore" />

        <main className="min-w-0 flex-1 overflow-auto px-12 py-10">
          <div className="flex flex-col gap-12">
            {/* top — 타이틀 + 액션 + 설명 */}
            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h1
                  className="text-headline2-bold"
                  style={{ color: "var(--color-greyscale-900)" }}
                >
                  모델 탐색
                </h1>
                <div
                  className="flex items-center gap-4"
                  style={{ color: "var(--color-primary-800)" }}
                >
                  <button
                    type="button"
                    className="inline-flex items-center gap-1"
                  >
                    <Icon name="add-filled" size={24} color="current" />
                    <span className="text-title3-semibold">모델 검색</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1"
                  >
                    <Icon name="download-filled" size={24} color="current" />
                    <span className="text-title3-semibold">모델 반입</span>
                  </button>
                </div>
              </div>
              <p
                className="text-body1-regular"
                style={{ color: "var(--color-greyscale-700)" }}
              >
                Hugging Face에 등록된 모델을 검색하고 은행 내부로 가져올 수
                있습니다.
                <br />
                모델 검색과 반입 버튼을 통해 필요한 모델을 손쉽게 반입하세요
              </p>
            </section>

            {/* tabFilter — 라인탭 + 검색 카드 */}
            <section className="flex flex-col gap-8">
              <LineTab
                items={["self-hosting", "serverless"]}
                value={0}
                size="l"
              />

              <div
                className="flex items-start gap-10 rounded-xl border border-solid px-12 py-8 shadow-3"
                style={{
                  backgroundColor: "var(--color-neutral-0)",
                  borderColor: "var(--color-greyscale-200)",
                }}
              >
                <div className="flex min-w-0 flex-1 gap-8">
                  <div className="flex flex-1 items-center gap-4">
                    <span
                      className="text-body1-semibold w-18 shrink-0"
                      style={{ color: "var(--color-greyscale-800)" }}
                    >
                      검색
                    </span>
                    <TextField
                      variant="search"
                      placeholder="모델명, 설명 입력"
                      containerClassName="flex-1"
                    />
                  </div>
                  <div className="flex flex-1 items-center gap-4">
                    <span
                      className="text-body1-semibold w-18 shrink-0"
                      style={{ color: "var(--color-greyscale-800)" }}
                    >
                      상태
                    </span>
                    <Dropdown
                      options={STATUS_OPTIONS}
                      placeholder="전체"
                      className="flex-1"
                    />
                  </div>
                </div>
                <Button variant="primary" size="md" className="w-32 shrink-0">
                  조회
                </Button>
              </div>
            </section>

            {/* Box — 건수/페이지크기 + 그리드 표 + 페이지네이션 */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span
                  className="text-body1-regular"
                  style={{ color: "var(--color-greyscale-800)" }}
                >
                  총{" "}
                  <span style={{ color: "var(--color-primary-800)" }}>99</span>
                  건
                </span>
                <Dropdown
                  options={PAGE_SIZE_OPTIONS}
                  defaultValue="12"
                  className="w-40"
                />
              </div>

              <div className="flex flex-col">
                {/* TH */}
                <div className="flex">
                  <TableHeaderCell className={COL_NO} label="NO" />
                  <TableHeaderCell
                    className={COL_NAME}
                    label="모델명"
                    arrow="down"
                  />
                  <TableHeaderCell
                    className={COL_STATUS}
                    label="상태"
                    arrow="down"
                  />
                  <TableHeaderCell
                    className={COL_DESC}
                    label="설명"
                    arrow="down"
                  />
                  <TableHeaderCell
                    className={COL_SIZE}
                    label="크기"
                    arrow="down"
                  />
                  <TableHeaderCell className={COL_IMPORT} label="모델 반입" />
                </div>

                {/* TD rows */}
                {ROWS.map((row, i) => (
                  <div className="flex" key={i}>
                    <TableCell className={COL_NO} value={i + 1} />
                    <TableCell className={COL_NAME} value={row.name} />
                    <TableCell
                      className={COL_STATUS}
                      value={
                        <Label color={STATUS_LABEL[row.status]}>
                          {row.status}
                        </Label>
                      }
                    />
                    <TableCell className={COL_DESC} value={row.desc} />
                    <TableCell className={COL_SIZE} value={row.size} />
                    <TableCell
                      className={COL_IMPORT}
                      type="txtbtn"
                      buttonLabel="모델 반입"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Pagination page={1} total={10} />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
