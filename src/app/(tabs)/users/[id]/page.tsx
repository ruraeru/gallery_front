import PostCard from "@/components/posts/PostCard";
import { getUser, isOwn } from "@/service/userService";
import Image from "next/image";
import Link from "next/link";
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
            margin: "0 auto",
        }}>
            <div style={{
                position: "relative"
            }}>
                <div style={{
                    width: "100%",
                    height: "199px",
                    backgroundColor: "red",
                    background: `url(${user.posts[0]?.image}) center/cover no-repeat`,
                }} />
                <Image
                    style={{
                        borderRadius: "50%",
                        position: "absolute",
                        border: "4px solid black",
                        objectFit: "cover",
                    }}
                    width={133}
                    height={133}
                    src={user.avatar || "/null"}
                    alt="profile"
                />
                {myProfile && (
                    <div style={{
                        position: "absolute",
                        right: 0,
                        display: "flex",
                        gap: "16px"
                    }}>
                        <div>
                            <button>신청 내역</button>
                        </div>
                        <button>
                            <Link href={`/users/${user.id}/edit`}>Edit Profile</Link>
                        </button>
                    </div>
                )
                }
                <div style={{
                    width: "100%",
                    backgroundColor: "black",
                    color: "white"
                }}>
                    <div style={{
                        width: "100%",
                        height: "199px",
                    }} />
                    <div>
                        <p>{user?.username}</p>
                        <p>@{user?.id}</p>
                        <p>{user?.created_at.toString()}</p>
                    </div>
                </div>
            </div>
            <div style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
            }}>
                {user.posts.map(post => (
                    <PostCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    )
}