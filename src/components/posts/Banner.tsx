"use client";

import { Post } from "@/service/postService";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Banner.module.css";

type BannerProps = {
  posts: Post[];
};

function BannerContent({ posts }: BannerProps) {
  return (
    <section className={styles.container}>
      <div className={styles.images}>
        {posts.slice(0, 3).map((post) => (
          <Link href={`/posts/${post?.id}`} key={post?.id}>
            <div className={styles.imageWrapper}>
              <Image
                className={styles.image}
                src={post?.image || ""}
                fill
                sizes="360px"
                priority
                quality={90}
                alt={post?.title || ""}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BannerContent;