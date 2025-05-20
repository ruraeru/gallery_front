"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

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
    revalidate: 10,
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
  const post = await db.post.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      _count: {
        select: {
          likes: true,
        },
      },
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

export async function getLikeStatus(postId: number) {
  const session = await getSession();
  const userId = session.id;

  const isLiked = await db.like.findUnique({
    where: {
      id: {
        userId,
        postId,
      },
    },
  });

  return {
    userId: session.id,
    isLiked: Boolean(isLiked),
  };
}

export async function likePost(postId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        postId,
        userId: session.id,
      },
    });
  } catch {
    redirect("/");
  }
  // revalidateTag("posts");
  revalidateTag(`post-detail-${postId}`);
}

export async function disLikePost(postId: number) {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          postId,
          userId: session.id,
        },
      },
    });
  } catch {
    console.log("여러번 클릭됨");
    redirect("/");
  }
  // revalidateTag("posts");
  revalidateTag(`post-detail-${postId}`);
}
