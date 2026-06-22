import { useEffect, useState, type ReactElement } from "react";
import { MD_050101 } from "./page/model/MD_050101";
import { MD_050102 } from "./page/model/MD_050102";
import { LG_010102 } from "./page/LG_010102/LG_010102";
import { Template } from "./page/Template/Template";

/** 페이지 라우트 — 새 페이지는 이 배열에만 추가하면 홈 목록과 경로가 함께 생긴다. */
interface Route {
  path: string;
  title: string;
  element: ReactElement;
}
const ROUTES: Route[] = [
  {
    path: "/model/MD_050101",
    title: "MD_050101 · 모델 탐색",
    element: <MD_050101 />,
  },
  {
    path: "/model/MD_050102",
    title: "MD_050102 · 모델 검사 결과 팝업",
    element: <MD_050102 />,
  },
  {
    path: "/login/LG_010102",
    title: "LG_010102 · 회원가입 완료 디스크립션",
    element: <LG_010102 />,
  },
];

/** 현재 해시 경로 (#/... → /...). 비어 있으면 홈("/"). */
function useHashPath() {
  const read = () => window.location.hash.replace(/^#/, "") || "/";
  const [path, setPath] = useState(read);
  useEffect(() => {
    const onHashChange = () => setPath(read());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return path;
}

/** 홈 — 등록된 페이지 목록 */
function Home() {
  return (
    <main className="bg-bg text-fg p-xl min-h-screen font-sans">
      <h1 className="text-2xl font-bold">R-jaegob</h1>
      <p className="text-fg-muted mt-md">
        디자인 시스템 하네스 — 페이지 미리보기
      </p>
      <ul className="mt-xl flex flex-col gap-2">
        <li>
          <a
            href="/Template"
            className="text-body1-regular underline"
            style={{ color: "var(--color-primary-800)" }}
          >
            Template · 디스크립션 가이드 (LG_010102)
          </a>
        </li>
        {ROUTES.map((route) => (
          <li key={route.path}>
            <a
              href={`#${route.path}`}
              className="text-body1-regular underline"
              style={{ color: "var(--color-primary-800)" }}
            >
              {route.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

function App() {
  const path = useHashPath();
  // /Template — 해시 라우팅과 별개로 실제 경로로 노출 (Vite SPA 폴백)
  if (window.location.pathname === "/Template") return <Template />;
  const route = ROUTES.find((r) => r.path === path);
  return route?.element ?? <Home />;
}

export default App;
