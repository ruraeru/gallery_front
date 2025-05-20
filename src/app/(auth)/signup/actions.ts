"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";
import { signUpFormSchema } from "@/lib/schema";

export async function createAccount(prevState: unknown, formData: FormData) {
  const data = {
    user_id: formData.get("user_id"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  console.log(`input: ${data}`);
  const result = await signUpFormSchema.safeParseAsync(data);
  console.log(`result: ${result.data}`);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        id: result.data.user_id,
        username: result.data.username,
        password: hashedPassword,
      },
      select: {
        id: true,
        license: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    session.license = user.license;
    await session.save();
    redirect("/");
  }
}
