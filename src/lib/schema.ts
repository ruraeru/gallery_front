import { z } from "zod";
import { userIdRegex } from "./const";
import db from "./db";

const exsistUserId = (user_id: string) => !user_id.includes("admin");

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

export const updateProfileFormSchema = z
  .object({
    avatar: z.string(),
    username: z.string().toLowerCase().trim().min(1).max(4),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(checkPassword, {
    message: "입력하신 비밀번호가 서로 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const signUpFormSchema = z
  .object({
    user_id: z
      .string()
      .toLowerCase()
      .trim()
      .regex(userIdRegex)
      .refine(exsistUserId, "admin not allowed"),
    username: z.string().toLowerCase().trim().min(1).max(4),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(async ({ user_id }, ctx) => {
    const user = await db.user.findUnique({
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
