import PostCard from "@/components/posts/PostCard";
import { getUser, isOwn } from "@/service/userService";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getUser(id);
    const myProfile = await isOwn(id);
    if (!user) {
        return notFound();
    }
    return (
        <div style={{
            maxWidth: "1200px",
            margin: "0 auto"
        }}>
            {myProfile && <button>asdas</button>}
            <div style={{

            }}>
                <div style={{
                    width: "100%",
                    height: "199px",
                    backgroundColor: "red",
                    background: `url(${user.posts[0]?.image}) center/cover no-repeat`,
                }} />
                <div style={{
                    position: "relative"
                }}>
                    <div style={{
                        width: "133px",
                        height: "133px",
                        background: `url(${user.avatar}) center/cover no-repeat`,
                        borderRadius: "50%",
                        position: "absolute",
                        top: "50%",
                        marginTop: "-15%",
                        border: "4px solid black"
                    }} />
                    <div style={{
                        width: "100%",
                        height: "199px",
                        backgroundColor: "black"
                    }}
                    />
                </div>
            </div>
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