import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET() {
  const data = await db.$queryRaw<{ date: string; count: number }[]>`
    SELECT DATE("createdAt") AS date, COUNT(*)::int AS count
    FROM "Post"
    WHERE "createdAt" >= (NOW() - INTERVAL '7 days')
    GROUP BY date
    ORDER BY date;
  `;

  return NextResponse.json(data);
}
