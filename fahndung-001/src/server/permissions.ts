import { TRPCError } from "@trpc/server";
import { type Session } from "next-auth";
import { auth } from "~/server/auth";

/**
 * Placeholder permission check. Throws if no active session.
 * Extend with real permission logic as needed.
 */
export async function requirePermission(permission: string, session?: Session | null) {
  const current = session ?? (await auth());
  if (!current?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  // Permission check would go here
}
