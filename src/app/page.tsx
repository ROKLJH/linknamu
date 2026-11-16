import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import ThemeToggle from "@/components/ThemeToggle";
import { profile, links } from "@/data/profile";

// 와이어프레임: 원형 프로필 사진 → 이름 → 한 줄 소개 → 세로 링크 카드 목록 → "…"
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-4 py-16">
      <ThemeToggle />
      <ProfileHeader profile={profile} />
      <ul className="mt-10 flex w-full flex-col gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} />
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xl tracking-widest text-neutral-400" aria-hidden>
        …
      </p>
      <footer className="mt-auto pt-12 text-xs text-neutral-400">링크나무 🌳</footer>
    </main>
  );
}
