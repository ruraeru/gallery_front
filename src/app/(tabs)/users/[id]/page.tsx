import PostCard from "@/components/posts/PostCard";
import { getUser } from "@/service/userService";

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getUser(id);
    return (
        <div>
            @{user?.id}
            {user?.username}
            <div>
                {user?.posts.map(post => (
                    <PostCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    )
}