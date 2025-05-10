import PostCard from "@/components/posts/PostCard";
import { getUser } from "@/service/userService";
import { notFound } from "next/navigation";

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getUser(id);
    if (!user) {
        return notFound();
    }
    return (
        <div>
            @{user.id}
            {user.username}
            <div>
                {user.posts.map(post => (
                    <PostCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    )
}