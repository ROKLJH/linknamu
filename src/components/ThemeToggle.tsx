"use client";

import { useLayoutEffect } from "react";

type Theme = "light" | "dark";

// 저장된 선택 → 기기 설정 순으로 결정 (layout.tsx의 인라인 스크립트와 같은 규칙)
function resolveTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  // 개발 모드 Strict Mode 재마운트 시 React가 <html> 속성을 지우므로 다시 적용 (배포 환경에선 변화 없음)
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", resolveTheme());
  }, []);

  const toggle = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next: Theme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  // 아이콘은 CSS(dark: 변형)로 전환해서 서버/클라이언트 렌더 결과가 항상 같음
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="밝은 화면 / 어두운 화면 전환"
      className="fixed top-4 right-4 flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-lg shadow-sm transition hover:scale-105 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <span className="dark:hidden" aria-hidden>
        🌙
      </span>
      <span className="hidden dark:inline" aria-hidden>
        ☀️
      </span>
    </button>
  );
}
