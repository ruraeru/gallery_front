"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { z } from "zod";
import { LoginState } from "./page";
import getSession from "@/lib/session";

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "아이디를 입력해주세요")
    .regex(/^[A-Za-z0-9]*$/, "아이디는 영어와 숫자만 입력 가능합니다."),
  password: z.string().trim().min(1, "password를 입력해주세요"),
});

interface UserResponseDataType {
  success: boolean;
  error?: string;
  data: {
    id: string;
    username: string;
  };
}

interface UserResponseType {
  data: UserResponseDataType;
}

const createUser = async (id: string, password: string) => {
  try {
    const res: UserResponseType = await axios.post(
      `http://localhost:3001/api/users`,
      {
        id,
        username: id,
        password,
      }
    );
    return res.data;
  } catch (error: any) {
    console.error("API Error: ", error.response?.data?.error || error.message);
    return {
      success: false,
      error: error.response?.data?.error || "회원가입에 실패했습니다.",
      data: { id: "", username: "" },
    };
  }
};

export async function login(prevState: LoginState, formData: FormData) {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const apiResult = await createUser(
    result.data.username,
    result.data.password
  );

  console.log("API RESULT", apiResult);
  if (apiResult.success) {
    const session = await getSession();
    session.id = parseInt(apiResult.data.id);
    await session.save();
    return redirect("/");
  } else {
    return {
      errors: {
        form: [apiResult.error || "로그인 처리 중 오류가 발생했습니다."],
      },
    };
  }
}
