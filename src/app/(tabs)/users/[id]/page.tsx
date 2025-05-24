import PostCard from "@/components/posts/PostCard";
import { getUser, isOwn } from "@/service/userService";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from '@/styles/UserProfile.module.css';

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getUser(id);
    const myProfile = await isOwn(id);

    if (!user) {
        return notFound();
    }

    const allowedPosts = user.posts.filter((post) => post.allowed);
    const notAllowedPosts = user.posts.filter((post) => !post.allowed);

    const coverImageUrl = user.posts.find(post => post.allowed && post.image)?.image || '/default_cover.png';
    const joinDateFormatted = new Date(user.created_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className={styles.profilePageContainer}>
            <header className={styles.profileHeader}>
                <div
                    className={styles.coverImage}
                    style={{ backgroundImage: `url(${coverImageUrl})` }}
                />

                {myProfile && (
                    <div className={styles.actionButtonsContainer}>
                        <Link className={styles.headerButton} href={`/users/${user.id}/edit`}>
                            프로필 수정하기
                        </Link>
                    </div>
                )}

                <div className={styles.headerContentWrapper}>
                    <div className={styles.avatarAndInfo}>
                        <Image
                            className={styles.avatarImage}
                            width={160}
                            height={160}
                            src={user.avatar || "/default_avatar.png"}
                            alt={`${user.username}'s profile picture`}
                            priority
                        />
                        <div className={styles.userInfo}>
                            <p className={styles.userName}>{user.username}</p>
                            <p className={styles.userId}>@{user.id}</p>
                            <p className={styles.joinDate}>가입일: {joinDateFormatted}</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className={styles.postsSectionContainer}>
                <section>
                    <h2 className={styles.sectionTitle}>게시물 ({allowedPosts.length})</h2>
                    {allowedPosts.length > 0 ? (
                        <div className={styles.postsGrid}>
                            {allowedPosts.map(post => (
                                <PostCard post={post} key={post.id} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyMessageWrapper}>
                            <p>아직 게시물이 없습니다.</p>
                            <Link href={"/posts/add"} className={styles.headerButton}>게시글 업로드 하러 가기!</Link>
                        </div>
                    )}
                </section>

                {myProfile && (
                    <section style={{ marginTop: '40px' }}>
                        <h2 className={styles.sectionTitle}>승인 대기 중인 게시물 ({notAllowedPosts.length})</h2>
                        {notAllowedPosts.length > 0 ? (
                            <div className={styles.postsGrid}>
                                {notAllowedPosts.map(post => (
                                    <PostCard post={post} key={post.id} />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyMessageWrapper}>
                                <p>승인 대기 중인 게시물이 없습니다.</p>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
}