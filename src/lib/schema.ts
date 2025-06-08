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

const MAX_AVATAR_SIZE_MB = 10;
const MAX_AVATAR_SIZE_BYTES = MAX_AVATAR_SIZE_MB * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/heic",
];

export const updateProfileFormSchema = z
  .object({
    avatar: z
      .instanceof(File, { message: "이미지 파일을 업로드해주세요." })
      .refine(
        (file) => file.size <= MAX_AVATAR_SIZE_BYTES,
        `파일 크기는 ${MAX_AVATAR_SIZE_MB}MB를 초과할 수 없습니다.`
      )
      .refine(
        (file) => ALLOWED_AVATAR_TYPES.includes(file.type),
        "지원되는 파일 형식은 PNG, JPG, JPEG, WEBP, HEIC 입니다."
      )
      .nullable(),
    username: z
      .string()
      .toLowerCase()
      .trim()
      .min(1, "이름을 입력해주세요.")
      .max(4, "이름은 4자 이하로 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .optional()
      .or(z.literal("")),
    confirmPassword: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "입력하신 비밀번호가 서로 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const signUpFormSchema = z
  .object({
    user_id: z
      .string()
      .toLowerCase()
      .trim()
      .regex(userIdRegex, "아이디는 숫자와 영어만 가능합니다.")
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
