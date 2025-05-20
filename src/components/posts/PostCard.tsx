"use client";

import { Post } from "@/service/postService";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/PostCard.module.css";
import InfoBar from "../post-info-bar";

interface PostCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  views: number;
  allowed: boolean;
  created_at: Date;
  updated_at: Date;
  userId: string;
  _count: {
    comments: number;
    likes: number;
  };
}

function PostCardContent({ post }: { post: PostCardProps }) {
  return (
    <article className={styles.container}>
      <Link href={`/posts/${post?.id}`}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={post.image || ""}
            fill
            sizes="(max-width: 768px) 100vw, 195px"
            quality={90}
            alt={post?.title || ""}
          />
        </div>
      </Link>
      <p className={styles.title}>{post?.title}</p>
      <p className={styles.description}>{post?.description}</p>
      <Link href={`/users/${post?.userId}`} className={styles.userLink}>@{post?.userId}</Link>
      <InfoBar views={post.views} likes={post._count.likes} comment={post._count.comments} />
    </article>
  );
}

export default PostCardContent;