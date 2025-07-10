import { requirePermission } from "~/server/permissions";
import { db } from "~/server/db";
import { PostsPerDayChart } from "~/components/analytics/PostsPerDayChart";

export const metadata = {
  title: "Analytics",
};

export default async function AnalyticsPage() {
  await requirePermission("reports.analytics");

  const [postCount, userCount, postsPerDay] = await Promise.all([
    db.post.count(),
    db.user.count(),
    db.$queryRaw<{ date: string; count: number }[]>`
      SELECT DATE("createdAt") AS date, COUNT(*)::int AS count
      FROM "Post"
      WHERE "createdAt" >= (NOW() - INTERVAL '7 days')
      GROUP BY date
      ORDER BY date;
    `,
  ]);

  return (
    <div className="mx-auto max-w-4xl py-10">
      <h1 className="mb-6 text-3xl font-bold">Analytics</h1>
      <div className="mb-4 flex gap-6">
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-600">Posts</p>
          <p className="text-2xl font-bold text-gray-900">{postCount}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-600">Users</p>
          <p className="text-2xl font-bold text-gray-900">{userCount}</p>
        </div>
      </div>
      <PostsPerDayChart data={postsPerDay} />
    </div>
  );
}
