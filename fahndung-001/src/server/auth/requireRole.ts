import { redirect } from "next/navigation";
import { auth } from "./index";

export async function requireRole(roles: string[]) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || !role || !roles.includes(role)) {
    redirect("/login");
  }
}
