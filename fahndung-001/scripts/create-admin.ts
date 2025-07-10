import bcrypt from "bcryptjs";
import { db } from "../src/server/db";

async function main() {
  const email = process.argv[2] ?? "admin@example.com";
  const password = process.argv[3] ?? "admin123";
  const hashed = await bcrypt.hash(password, 10);

  await db.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashed,
      role: "ADMIN",
      name: "Admin",
    },
  });

  console.log(`Admin user ready: ${email}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
