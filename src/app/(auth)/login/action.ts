"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkUserExists = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const loginSchema = z.object({
  user_id: z
    .string()
    .trim()
    .min(1, "아이디를 입력해주세요")
    .refine(checkUserExists, "존재하지 않는 아이디입니다."),
  password: z.string().trim().min(1, "password를 입력해주세요"),
});

export async function login(prevState: unknown, formData: FormData) {
  const data = {
    user_id: formData.get("user_id"),
    password: formData.get("password"),
  };
  const result = await loginSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        id: result.data.user_id,
      },
      select: {
        id: true,
        password: true,
        license: true,
      },
    });

    const ok = await bcrypt.compare(
      result.data.password,
      user?.password ?? "xx"
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      session.license = user!.license;
      await session.save();
      redirect("/");
    } else {
      return {
        fieldErrors: {
          password: ["비밀번호가 맞지 않습니다."],
          user_id: [],
        },
      };
    }
  }
}
