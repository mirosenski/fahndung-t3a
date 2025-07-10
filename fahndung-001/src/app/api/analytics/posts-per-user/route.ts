import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET() {
  const data = await db.post.groupBy({
    by: ["createdById"],
    _count: true,
  });

  return NextResponse.json(data);
}
