import { db } from "~/server/db";

export interface AuditLogInput {
  action: string;
  entity: string;
  entityId: string;
  success: boolean;
  details?: unknown;
  userId?: string | null;
  headers?: Headers;
}

export const auditEvents = new EventTarget();

export async function createAuditLog(input: AuditLogInput) {
  const ip =
    input.headers?.get("x-forwarded-for") ??
    input.headers?.get("x-real-ip") ??
    input.headers?.get("cf-connecting-ip") ??
    null;
  const userAgent = input.headers?.get("user-agent") ?? null;

  const log = await db.auditLog.create({
    data: {
      action: input.action,
      entity: input.entity,
      entityId: input.entityId,
      success: input.success,
      details: input.details as any,
      userId: input.userId,
      ip,
      userAgent,
    },
  });

  auditEvents.dispatchEvent(new CustomEvent("log", { detail: log }));
  return log;
}
