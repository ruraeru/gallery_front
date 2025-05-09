import { unstable_cache as nextCache } from "next/cache";
import db from "./db";

export const getPosts = async () => {
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
  console.log(posts);
  return posts;
};

export const getCahcedPosts = nextCache(getPosts, ["posts"]);

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
