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
  });
}
