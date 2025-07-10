import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET() {
  const [postCount, userCount] = await Promise.all([
    db.post.count(),
    db.user.count(),
  ]);

  return NextResponse.json({ postCount, userCount });
}
