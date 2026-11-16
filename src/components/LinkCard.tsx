"use client";

import type { LinkItem } from "@/data/profile";

function recordClick(id: string) {
  const body = JSON.stringify({ id });
  // sendBeacon은 페이지를 떠나도 요청이 전송되도록 보장
  if (navigator.sendBeacon?.("/api/click", new Blob([body], { type: "application/json" }))) {
    return;
  }
  fetch("/api/click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(link.id)}
      className="block w-full rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md active:translate-y-0 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-emerald-500"
    >
      <span className="block font-semibold">{link.title}</span>
      {link.description && (
        <span className="mt-0.5 block text-sm text-neutral-500 dark:text-neutral-400">
          {link.description}
        </span>
      )}
    </a>
  );
}
