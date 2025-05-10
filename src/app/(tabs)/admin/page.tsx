import PostCard from "@/components/posts/PostCard";
import db from "@/lib/db";
import getSession from "@/lib/session"
import { getAllowedPosts } from "@/service/postService";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function AdminPage() {
    const session = await getSession();
    const posts = await getAllowedPosts();
    if (session.license > 0) {
        return notFound();
    }

    // const allowedPost = async () => {
    //     "use server"
    //     await db.post.updateMany({
    //         data: {
    //             allowed: true
    //         }
    //     });
    //     revalidatePath("/")
    // }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            Admin page
            {posts.map((post) => (
                <div key={post.id}>
                    <PostCard post={post} />
                    {/* <form onClick={allowedPost}>
                        <button>allowed</button>
                    </form> */}
                </div>
            ))
            }
        </Suspense >
    )
}