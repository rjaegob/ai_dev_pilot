import { Logo } from "../Logo/Logo";
import { Icon } from "../Icon/Icon";
import { OptionButton } from "../Button/OptionButton";

export type HeaderType =
  | "pc_login"
  | "pcMainOn"
  | "pcMainOff"
  | "pcMainNopublic"
  | "pcMainDisabled"
  | "devmode";

export interface HeaderProps {
  /** 헤더 변형 — Figma header 컴포넌트셋 6종 */
  type?: HeaderType;
  /** 브레드크럼 경로 (location 영역). 미지정 시 변형 기본값 사용 */
  breadcrumb?: string[];
  /** 프로젝트 박스 제목 (projectBox 영역). 미지정 시 변형 기본값 사용 */
  projectName?: string;
  /** 사용자 이니셜 (우측 아바타) */
  userInitial?: string;
  className?: string;
}

/** 변형별 기본 브레드크럼 (Figma: "화면명" × 6) */
const DEFAULT_BREADCRUMB = ["화면명", "화면명", "화면명", "화면명", "화면명"];

/** 변형별 projectBox 기본 제목 */
const DEFAULT_PROJECT_NAME: Record<HeaderType, string> = {
  pc_login: "",
  pcMainOn: "Public",
  pcMainOff: "Public",
  pcMainNopublic: "대출 상품 추천",
  pcMainDisabled: "프로젝트 전환 불가",
  devmode: "Public",
};

/** 좌측 LNB 폭 박스: 로고 + 좌우 이동 화살표 */
function LogoArrow() {
  return (
    <div
      className="flex shrink-0 items-center border-r border-solid py-5 pr-5 pl-8"
      style={{
        width: "var(--layout-lnb-w)",
        borderColor: "var(--color-greyscale-200)",
      }}
    >
      <div className="inline-grid place-items-start">
        <div className="col-start-1 row-start-1">
          <Logo name="shinhan" size={32} />
        </div>
        <div
          className="col-start-1 row-start-1 mt-1.5 ml-[148px] flex items-center gap-4" // token-exempt: 로고 하단 화살표 행 위치(Figma ml 148)
          style={{ color: "var(--color-greyscale-500)" }}
        >
          <Icon name="gnb-arrow-left" size={20} color="current" title="이전" />
          <Icon name="gnb-arrow-right" size={20} color="current" title="다음" />
        </div>
      </div>
    </div>
  );
}

/** 브레드크럼 (location 영역) */
function Breadcrumb({ items }: { items: string[] }) {
  return (
    <div
      className="flex flex-1 flex-col justify-center px-12"
      style={{ height: "var(--layout-header-h)" }}
    >
      <div
        className="flex items-center gap-2"
        style={{ color: "var(--color-greyscale-500)" }}
      >
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-2">
            {idx > 0 && <Icon name="small-right" size={24} color="current" />}
            <span className="text-body1-regular whitespace-nowrap">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** 우측 프로젝트 박스 — active(Public/전체) / nopublic(테두리만) / disabled(회색) */
function ProjectBox({ type, name }: { type: HeaderType; name: string }) {
  const isDisabled = type === "pcMainDisabled";
  const isNopublic = type === "pcMainNopublic";
  const showTag =
    type === "pcMainOn" || type === "pcMainOff" || type === "devmode";

  const background = isDisabled
    ? "var(--color-neutral-100)"
    : isNopublic
      ? "transparent"
      : "var(--color-neutral-0)";
  const textColor = isDisabled
    ? "var(--color-greyscale-550)"
    : "var(--color-greyscale-900)";

  return (
    <div className="flex items-start">
      <div
        className="flex items-center gap-6 rounded-md border border-solid px-4 py-3"
        style={{
          backgroundColor: background,
          borderColor: "var(--color-greyscale-300)",
        }}
      >
        <div className="flex items-center gap-2" style={{ color: textColor }}>
          <Icon name="project" size={24} color="current" />
          <span className="text-body2-regular truncate">{name}</span>
        </div>
        {showTag && (
          <span
            className="text-caption2-regular flex h-6 shrink-0 items-center whitespace-nowrap rounded-sm border border-solid px-1.5"
            style={{
              backgroundColor: "var(--color-neutral-100)",
              borderColor: "var(--color-greyscale-300)",
              color: "var(--color-greyscale-900)",
            }}
          >
            전체
          </span>
        )}
      </div>
    </div>
  );
}

/** 우측 액션 영역 — IDE 버튼 / 알림 / 사용자 아바타 */
function RightActions({
  type,
  userInitial,
}: {
  type: HeaderType;
  userInitial: string;
}) {
  const alarmOn = type === "pcMainOn";
  return (
    <div className="flex items-center justify-center gap-4 px-8 py-4">
      <OptionButton variant="soft">IDE</OptionButton>
      <span
        className="relative flex"
        style={{ color: "var(--color-greyscale-900)" }}
      >
        <Icon name="alarm" size={32} color="current" title="알림" />
        {alarmOn && (
          <span
            className="absolute top-1.5 right-1.5 size-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-state-red)" }}
          />
        )}
      </span>
      <span
        className="text-body2-medium flex size-[38px] items-center justify-center rounded-full" // token-exempt: 아바타 고정 지름 38px (Figma userName)
        style={{
          backgroundColor: "var(--color-brand-shinhan-blue)",
          color: "var(--color-text-white)",
        }}
      >
        {userInitial}
      </span>
    </div>
  );
}

export function Header({
  type = "pcMainOn",
  breadcrumb,
  projectName,
  userInitial = "신한",
  className,
}: HeaderProps) {
  const isLogin = type === "pc_login";
  const items = breadcrumb ?? DEFAULT_BREADCRUMB;
  const name = projectName ?? DEFAULT_PROJECT_NAME[type];
  const isDev = type === "devmode";

  return (
    <header
      className={[
        "flex w-full min-w-[700px] items-center border-b border-solid", // token-exempt: 최소폭 Figma min-w(700px)
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        height: "var(--layout-header-h)",
        backgroundColor: "var(--color-neutral-0)",
        borderColor: "var(--color-greyscale-200)",
      }}
    >
      {/* 좌측: 로고 박스 + 브레드크럼 */}
      <div className="flex flex-1 items-center">
        <LogoArrow />
        {!isLogin && <Breadcrumb items={items} />}
      </div>

      {/* 우측: (DEV 배지) + 프로젝트 박스 + 액션 */}
      {!isLogin && (
        <div className="flex items-center">
          <div className="flex items-center gap-4">
            {isDev && (
              <span
                className="text-body3-regular flex items-center justify-center rounded-full px-3 py-0.5"
                style={{
                  backgroundColor: "var(--color-primary-800)",
                  color: "var(--color-text-white)",
                }}
              >
                DEV
              </span>
            )}
            <ProjectBox type={type} name={name} />
          </div>
          <RightActions type={type} userInitial={userInitial} />
        </div>
      )}
    </header>
  );
}
