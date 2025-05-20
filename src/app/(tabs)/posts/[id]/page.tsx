import Detail from "@/components/imageDtail";
import LikeButton from "@/components/posts/like-button";
import { getCachedPostByID, getLikeStatus, getPostByID } from "@/service/postService";
import { HandThumbUpIcon, HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon, HandThumbUpIcon as SolidHandThumbUpIcon, HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./ProductDetail.module.css";
import Link from "next/link";


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getCachedPostByID(parseInt(id));
    if (!post) {
        return notFound();
    }
    const { isLiked } = await getLikeStatus(post.id);
    return (
        <Detail url={post.image}>
            <h1 style={{
                fontSize: "50px",
                // backgroundColor: "red",
                textShadow: "1px 1px 5px black"
            }}>{post.title}</h1>
            <div style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}>
                <div key={post.id} className={styles.imageWrapper} style={{
                    position: "relative",
                    placeItems: "center center",
                    textAlign: "center",
                    // width: "420px",
                    // height: "630px",
                }}>
                    <Image
                        style={{
                            objectFit: "cover",
                            boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
                        }}
                        src={post.image || ""}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 195px"
                        quality={90}
                        alt={post.title}
                    />
                </div>
                <div style={{
                    width: "100%",
                    placeItems: "flex-start",
                    display: "flex",
                    gap: "6px",
                    alignItems: "center"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <LikeButton postId={post.id} isLiked={isLiked} />
                        <span>좋아요 : {post._count.likes}</span>
                    </div>

                    <div style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <ChartBarIcon width={24} />
                        <p>조회수 : {post.views}</p>
                    </div>
                </div>
            </div >
            <h3 style={{
                fontSize: "32px"
            }}>Photo by</h3>
            <Link href={`/users/${post.userId}`} style={{
                fontSize: "32px"
            }}>
                <h3>{post.userId}</h3>
            </Link>
        </Detail >
    )
}