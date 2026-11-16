import { connection } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";
import { links } from "@/data/profile";

const validIds = new Set(links.map((l) => l.id));

// 링크 클릭 1회 기록: POST /api/click  body: { "id": "github" }
export async function POST(req: Request) {
  let id: unknown;
  try {
    ({ id } = await req.json());
  } catch {
    return Response.json({ error: "잘못된 요청" }, { status: 400 });
  }
  if (typeof id !== "string" || !validIds.has(id)) {
    return Response.json({ error: "알 수 없는 링크" }, { status: 400 });
  }

  const col = await getClicksCollection();
  if (!col) {
    return Response.json({ ok: false, reason: "MONGODB_URI 미설정" }, { status: 503 });
  }

  await col.updateOne(
    { _id: id },
    { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
    { upsert: true },
  );
  return Response.json({ ok: true });
}

// 링크별 클릭 수 조회: GET /api/click  →  { "github": 3, "blog": 1, ... }
export async function GET() {
  // 빌드 때 정적으로 굳지 않고 매 요청마다 실행되도록 지정 (Cache Components)
  await connection();

  const col = await getClicksCollection();
  if (!col) {
    return Response.json({ error: "MONGODB_URI 미설정" }, { status: 503 });
  }
  const docs = await col.find({}).toArray();
  const counts: Record<string, number> = Object.fromEntries(links.map((l) => [l.id, 0]));
  for (const d of docs) if (d._id in counts) counts[d._id] = d.count;
  return Response.json(counts);
}
