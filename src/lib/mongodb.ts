import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 모드 HMR에서 연결이 계속 새로 생기지 않도록 전역에 캐시
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 실패한 연결을 캐시에 남기지 않아 다음 요청에서 재시도
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export type ClickDoc = { _id: string; count: number; updatedAt: Date };

/** MONGODB_URI가 없으면 null을 반환 (DB 없이도 페이지는 동작) */
export async function getClicksCollection() {
  const clientPromise = getClientPromise();
  if (!clientPromise) return null;
  const client = await clientPromise;
  return client.db(dbName).collection<ClickDoc>("clicks");
}
