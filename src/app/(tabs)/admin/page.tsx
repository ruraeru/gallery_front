import PostCard from "@/components/posts/PostCard";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { getCachedUnallowedPosts, getUnallowedPosts } from "@/service/postService";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const revaildateCache = () => {
    revalidateTag("un-allowed-posts");
    revalidateTag("posts");
}

async function allowedPost(formData: FormData) {
    "use server";
    const postId = formData.get("postId") as string;
    if (!postId) throw new Error("Post ID is required");

    await db.post.update({
        where: { id: parseInt(postId) },
        data: { allowed: true },
    });

    revaildateCache();
}

async function deletePost(formData: FormData) {
    "use server";
    const postId = formData.get("postId") as string;
    if (!postId) throw new Error("Post ID is required");

    await db.post.delete({
        where: { id: parseInt(postId) },
    });

    revaildateCache();
}

export default async function AdminPage() {
    const session = await getSession();
    const posts = await getUnallowedPosts();

    if (!session || session.license > 0) {
        return notFound();
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <h1>Admin Page</h1>
            {posts.map((post) => (
                <div key={post.id} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around"
                }}>
                    <div>
                        <PostCard post={post} />
                    </div>
                    <div>
                        <form action={allowedPost}>
                            <input type="hidden" name="postId" value={post.id} />
                            <button type="submit">Allow</button>
                        </form>
                        <form action={deletePost}>
                            <input type="hidden" name="postId" value={post.id} />
                            <button type="submit">Delete</button>
                        </form>
                    </div>
                </div>
            ))}
        </Suspense>
    );
}