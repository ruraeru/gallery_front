import getSession from "@/lib/session";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddButton from "@/components/AddButton";
import Banner from "@/components/posts/Banner";
import PostCard from "@/components/posts/PostCard";
import { getCahcedPosts } from "@/service/postService";
import styles from '@/styles/HomePage.module.css';
import { getUserInfo } from "@/service/userService";

export default async function Home() {
  const posts = await getCahcedPosts();
  const session = await getSession();
  const isLogin = Boolean(session?.id);
  const userInfo = await getUserInfo(session.id);

  return (
    <div className={styles.pageContainer}>
      <Header isLogin={isLogin} userInfo={userInfo} />
      <main className={styles.mainContent}>
        {/* 베너 부분 */}
        <section className={styles.bannerSection}>
          <Banner posts={posts} />
        </section>
        <section className={styles.postsSection}>
          {posts && posts.length > 0 ? (
            <div className={styles.postsGrid}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className={styles.emptyPostsMessage}>
              아직 게시물이 없습니다. 새로운 소식을 가장 먼저 공유해보세요!
            </p>
          )}
        </section>
      </main>
      {isLogin && <AddButton />}
      <Footer />
    </div>
  );
}