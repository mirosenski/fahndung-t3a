import { Status, FahndungType } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { requirePermission } from "~/server/auth/rbac";
import { createAuditLog } from "~/lib/audit";

export const fahndungSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.nativeEnum(Status).optional(),
  type: z.nativeEnum(FahndungType),
  reward: z.number().optional(),
  gender: z.string(),
  age: z.number(),
  lastSeen: z.date(),
  location: z.string(),
  imageURL: z.string().url(),
});

export const fahndungRouter = createTRPCRouter({
  create: protectedProcedure
    .input(fahndungSchema)
    .mutation(async ({ ctx, input }) => {
      await requirePermission("fahndung:create", ctx.session);
      const fahndung = await ctx.db.fahndung.create({ data: input });
      void createAuditLog({
        action: "create",
        entity: "Fahndung",
        entityId: String(fahndung.id),
        success: true,
        userId: ctx.session.user.id,
        headers: ctx.headers,
      });
      return fahndung;
    }),

  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      await requirePermission("fahndung:view", ctx.session);
      return ctx.db.fahndung.findUnique({ where: { id: input.id } });
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    await requirePermission("fahndung:list", ctx.session);
    return ctx.db.fahndung.findMany();
  }),

  update: protectedProcedure
    .input(fahndungSchema.merge(z.object({ id: z.number() })))
    .mutation(async ({ ctx, input }) => {
      await requirePermission("fahndung:edit", ctx.session);
      const { id, ...data } = input;
      return ctx.db.fahndung.update({ where: { id }, data });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await requirePermission("fahndung:delete", ctx.session);
      return ctx.db.fahndung.delete({ where: { id: input.id } });
    }),
});
