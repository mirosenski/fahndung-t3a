import { Status } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
        data: {
          name: input.name,
          status: Status.NEW,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });

      void createAuditLog({
        action: "create",
        entity: "Post",
        entityId: String(post.id),
        success: true,
        details: { name: input.name },
        userId: ctx.session.user.id,
        headers: ctx.headers,
      });

      return post;
    }),

  update: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await requirePermission("post:edit", ctx.session);
      return ctx.db.post.update({
        where: { id: input.id },
        data: { name: input.name },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await requirePermission("post:delete", ctx.session);
      return ctx.db.post.delete({ where: { id: input.id } });
    }),

  publish: protectedProcedure
    .input(z.object({ id: z.number(), status: z.nativeEnum(Status).optional() }))
    .mutation(async ({ ctx, input }) => {
      await requirePermission("post:publish", ctx.session);
      return ctx.db.post.update({
        where: { id: input.id },
        data: { status: input.status ?? Status.ACTIVE },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
