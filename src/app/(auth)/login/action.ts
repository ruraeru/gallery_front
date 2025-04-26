import axios from "axios";
import { redirect } from "next/navigation";
import { z } from "zod";
import { LoginState } from "./page";

const loginSchema = z.object({
  username: z.string().trim().min(1, "username을 입력해주세요"),
  password: z.string().trim().min(1, "password를 입력해주세요"),
});

interface UserResponseDataType {
  success: boolean;
  error?: string;
}

interface UserResponseType {
  response: {
    data: UserResponseDataType;
  };
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
    return res.response.data;
  } catch (error: any) {
    console.error("API Error: ", error.response?.data?.error || error.message);
    return {
      success: false,
      error: error.response?.data?.error || "회원가입에 실패했습니다.",
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

  if (apiResult.success) {
    redirect("/");
  } else {
    return {
      errors: {
        form: [apiResult.error || "로그인 처리 중 오류가 발생했습니다."],
      },
    };
  }
}
