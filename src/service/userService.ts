"use server";

import db from "@/lib/db";

export const getUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      avatar: true,
      username: true,
      posts: true,
    },
  });
  return user;
};
