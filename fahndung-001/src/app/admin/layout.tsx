import { ReactNode } from "react";
import AdminNav from "~/components/admin/AdminNav";
import UserMenu from "~/components/admin/UserMenu";
import { requireRole } from "~/server/auth/requireRole";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireRole(["ADMIN", "EDITOR"]);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-50 dark:bg-gray-950 p-4">
        <AdminNav />
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end border-b p-4">
          <UserMenu />
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
