"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    user_id: z.string().toLowerCase().trim(),
    username: z.string().toLowerCase().trim(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(async ({ user_id }, ctx) => {
    const user = await db.users.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        path: ["user_id"],
        code: "custom",
        message: "이미 존재하는 아이디입니다.",
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPassword, {
    message: "입력하신 비밀번호가 서로 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: unknown, formData: FormData) {
  const data = {
    user_id: formData.get("user_id"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.users.create({
      data: {
        id: result.data.user_id,
        username: result.data.username,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/");
  }
}
