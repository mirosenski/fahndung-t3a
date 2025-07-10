import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export async function requirePermission(_permission: string) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}
