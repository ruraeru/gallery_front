"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";

export const getUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      avatar: true,
      username: true,
      created_at: true,
      posts: {
        include: {
          _count: true,
        },
      },
    },
  });
  return user;
};

export type UserInfoType = Awaited<ReturnType<typeof getUser>>;

export const isOwn = async (id: string) => {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  return user?.id === session.id;
};
