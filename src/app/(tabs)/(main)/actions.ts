"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logOut() {
  const cookieStore = cookies();
  (await cookieStore).delete("gallery_cookie");
  redirect("/");
}
