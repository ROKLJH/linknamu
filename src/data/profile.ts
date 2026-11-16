// 프로필과 링크 데이터. 여기만 수정하면 페이지 내용이 바뀝니다.
// 지금은 보여 주기용 더미 값입니다. 실제 내용으로 바꿔 주세요.

export type LinkItem = {
  id: string; // 클릭 수 집계에 쓰이는 고유 키 (바꾸면 집계가 새로 시작됨)
  title: string;
  url: string;
  description?: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string; // public/ 기준 경로
};

export const profile: Profile = {
  name: "엔서",
  bio: "AI 바이브코딩 꿈나무",
  image: "/profile.jpg",
};

export const links: LinkItem[] = [
  {
    id: "github",
    title: "GitHub",
    url: "https://github.com/",
    description: "코드 저장소",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    url: "https://www.linkedin.com/",
    description: "경력 및 이력",
  },
  {
    id: "blog",
    title: "Blog",
    url: "https://velog.io/",
    description: "개발 기록",
  },
];
