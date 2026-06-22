/*
 * tokenStory.helpers.ts — 토큰 시각화 story 전용 헬퍼 (비-CSS, 값 하드코딩 없음)
 *
 * 토큰의 "이름"만 가지고 런타임에 계산된 값을 읽어 라벨로 보여주기 위한 유틸.
 * raw 값(hex/px)을 소스에 적지 않으므로 check-hardcode hook 과 정합한다.
 */
import { useEffect, useState } from "react";

/** 디자인 스타일 가이드 Figma 파일 (node 만 갈아끼워 각 토큰 페이지로 연결). */
export const FIGMA_BASE =
  "https://www.figma.com/design/lhY9RZGmQGc4b97BJaemoJ/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2_Design-Style-Guide?node-id=";

/** :root 에 정의된 CSS 변수의 계산된 값을 읽는다. (Colors/Radius/Spacing/Layout) */
export function useRootVar(name: string): string {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(
      getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
    );
  }, [name]);
  return value;
}
