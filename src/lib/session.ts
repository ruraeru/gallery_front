import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id: string;
  license: number;
}

export default async function getSession() {
  return getIronSession<SessionContent>(await cookies(), {
    cookieName: "gallery_cookie",
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      sameSite: "lax", // 크로스-사이트 요청에서 동작
      maxAge: 60 * 60 * 24 * 7, // 7일 유지
      path: "/", // 모든 경로에서 접근 가능
    },
  });
}
