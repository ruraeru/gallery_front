"use client";

import { Post } from "@/service/postService";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/PostCard.module.css";

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
}

function PostCardContent({ post }: { post: PostCardProps }) {
  return (
    <div className={styles.container}>
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
    </div>
  );
}

export default PostCardContent;