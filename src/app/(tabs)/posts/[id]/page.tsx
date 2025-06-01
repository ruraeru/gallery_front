import Detail from "@/components/imageDtail";
import LikeButton from "@/components/posts/like-button";
import { getCachedPostByID, getLikeStatus } from "@/service/postService";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "@/styles/PostDetail.module.css";
import Link from "next/link";
import { ChartBarIcon } from "@heroicons/react/24/outline";


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getCachedPostByID(parseInt(id));
    if (!post) {
        return notFound();
    }
    const { isLiked } = await getLikeStatus(post.id);
    return (
        <Detail url={post.image}>
            <h1 className={styles.mainTitle}>{post.title}</h1>
            <div className={styles.container}>
                <div key={post.id} className={styles.imageWrapper}>
                    <Image
                        className={styles.image}
                        src={post.image || ""}
                        fill
                        priority
                        sizes="(max-width: 768px) 300px, 420px"
                        quality={90}
                        alt={post.title}
                    />
                    {post.description && (
                        <div className={styles.descriptionOverlay}>
                            <i className={styles.descriptionTitle}>{post.title}</i>
                            <hr className={styles.divider} />
                            <p>{post.description}</p>
                        </div>
                    )}
                </div>
                <div className={styles.infoRow}>
                    <div className={styles.likeSection}>
                        <LikeButton postId={post.id} isLiked={isLiked} />
                        <span>좋아요 : {post._count.likes}</span>
                    </div>
                    {/* <div className={styles.viewSection}>
                        <ChartBarIcon width={32} />
                        <span>조회수 : {post.views}</span>
                    </div> */}
                </div>
            </div>
            <div className={styles.photoBy}>
                <i>Photo by</i>
                <Link href={`/users/${post.userId}`} className={styles.userName}>
                    <i>{post.userId}</i>
                </Link>
            </div>
        </Detail >
    )
}