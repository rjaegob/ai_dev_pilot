import { ModelInspectionModal } from "../modal/ModelInspectionModal";

/**
 * MD_050102_P01 — "모델 검사 결과" 모달 (Figma 40000001-41787 / 4032-25384).
 * 원본 Large 모달(ModelInspectionModal)을 딤 오버레이 위에 띄워 실제 팝업처럼 확인한다.
 */
export function MD_050102() {
  return (
    <div
      className="flex min-h-screen items-center justify-center overflow-auto p-10"
      style={{ backgroundColor: "var(--color-overlay)" }}
    >
      <ModelInspectionModal onClose={() => {}} />
    </div>
  );
}
