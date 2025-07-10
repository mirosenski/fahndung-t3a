"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { db } from "~/server/db";

const PAGE_SIZE = 10;

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export async function getUsers(page = 1) {
  const [users, total] = await Promise.all([
    db.user.findMany({
      select: { id: true, name: true, email: true },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { email: "asc" },
    }),
    db.user.count(),
  ]);

  return { users, total };
}

export async function createUser(input: unknown) {
  const data = createUserSchema.parse(input);
  const hashed = await bcrypt.hash(data.password, 10);

  await db.user.create({
    data: { name: data.name, email: data.email, password: hashed },
  });

  revalidatePath("/admin/users");
}

export async function updateUser(id: string, input: unknown) {
  const data = updateUserSchema.parse(input);
  const update: Record<string, string | undefined> = {};
  if (data.name) update.name = data.name;
  if (data.email) update.email = data.email;
  if (data.password) update.password = await bcrypt.hash(data.password, 10);

  await db.user.update({ where: { id }, data: update });

  revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
  await db.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}
