import { redirect } from "next/navigation";

import { ROLE_PERMISSIONS } from "~/lib/permissions";
import { auth } from "./index";

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/unauthorized");
  }
  return session;
}

export async function requireRole(allowedRoles: string[] | string) {
  const session = await requireAuth();
  const role = (session.user as Record<string, unknown>).role as string | undefined;
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!role || !roles.includes(role)) {
    redirect("/unauthorized");
  }

  return session;
}

export async function checkPermission(permission: string) {
  const session = await auth();
  const role = (session?.user as Record<string, unknown> | undefined)?.role as string | undefined;
  if (!role) return false;

  const permissions = ROLE_PERMISSIONS[role] ?? [];
  return permissions.includes("*") || permissions.includes(permission);
}

export async function requirePermission(permission: string) {
  const allowed = await checkPermission(permission);
  if (!allowed) {
    redirect("/unauthorized");
  }
}
