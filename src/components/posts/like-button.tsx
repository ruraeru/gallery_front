"use client"

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { disLikePost, getLikeStatus, likePost } from "@/service/postService";

export default function LikeButton({ postId, isLiked }: { postId: number, isLiked: boolean }) {
    const onClick = async () => {
        if (isLiked) {
            await disLikePost(postId);
        }
        else {
            await likePost(postId);
        }
    }
    return (
        <form action={onClick}>
            <button type="submit">
                {isLiked
                    ? <HeartIcon width={32} />
                    : <OutlineHeartIcon width={32} />
                }
            </button>
        </form>
    )
}