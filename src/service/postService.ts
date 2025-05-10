"use server";

import db from "@/lib/db";
import { unstable_cache as nextCache } from "next/cache";

export const getUnallowedPosts = async () => {
  const posts = await db.post.findMany({
    where: {
      allowed: false,
    },
    include: {
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
  });
  return posts;
};

export const getCachedUnallowedPosts = nextCache(
  getUnallowedPosts,
  ["un-allowed-posts"],
  {
    tags: ["un-allowed-posts"],
  }
);

export const getPosts = async () => {
  const posts = await db.post.findMany({
    where: {
      allowed: true,
    },
    include: {
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
  });
  return posts;
};

export const getCahcedPosts = nextCache(getPosts, ["posts"], {
  tags: ["posts"],
  revalidate: 10,
});

export const getPostByID = async (id: number) => {
  const post = await db.post.findUnique({
    where: {
      id,
    },
  });

  return post;
};

export type Post = Awaited<ReturnType<typeof getPostByID>>;

export async function getCachedPostByID(id: number) {
  const cachedOpertaion = nextCache(getPostByID, ["post-detail"], {
    tags: [`post-detail-${id}`],
    revalidate: 10,
  });

  return cachedOpertaion(id);
}
