import PostCard from "@/components/posts/PostCard";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { getUnallowedPosts } from "@/service/postService";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import styles from '@/styles/AdminPage.module.css'; // 새로운 CSS 모듈 임포트

async function allowedPost(formData: FormData) {
    "use server";
    const postIdString = formData.get("postId") as string;
    const postId = parseInt(postIdString, 10);

    await db.post.update({
        where: { id: postId },
        data: { allowed: true },
    });

    revalidateTag("un-allowed-posts");
    revalidateTag("posts");
}

async function deletePost(formData: FormData) {
    "use server";
    const postIdString = formData.get("postId") as string;
    const postId = parseInt(postIdString, 10);

    await db.post.delete({
        where: { id: postId },
    });

    revalidateTag("un-allowed-posts");
    revalidateTag("posts");
}

async function UnallowedPostsList() {
    const posts = await getUnallowedPosts();

    if (!posts || posts.length === 0) {
        return <div className={styles.emptyState}>승인 대기 중인 게시물이 없습니다.</div>;
    }

    return (
        <div className={styles.postReviewList}>
            {posts.map((post) => (
                <article key={post.id} className={styles.postReviewItem}>
                    <div className={styles.postCardWrapper}>
                        <PostCard post={post} />
                    </div>
                    <div className={styles.actionsContainer}>
                        <form action={allowedPost}>
                            <input type="hidden" name="postId" value={post.id.toString()} />
                            <button type="submit" className={`${styles.actionButton} ${styles.allowButton}`}>
                                승인
                            </button>
                        </form>
                        <form action={deletePost}>
                            <input type="hidden" name="postId" value={post.id.toString()} />
                            <button type="submit" className={`${styles.actionButton} ${styles.deleteButton}`}>
                                삭제
                            </button>
                        </form>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default async function AdminPage() {
    const session = await getSession();

    if (!session || session.license !== 0) {
        notFound();
    }

    return (
        <div className={styles.adminPageContainer}>
            <h1 className={styles.pageTitle}>게시물 승인 관리</h1>
            <Suspense fallback={<div className={styles.loadingState}>게시물을 불러오는 중...</div>}>
                <UnallowedPostsList />
            </Suspense>
        </div>
    );
}