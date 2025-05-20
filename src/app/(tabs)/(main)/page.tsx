import getSession from "@/lib/session";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddButton from "@/components/AddButton";
import Banner from "@/components/posts/Banner";
import ImageCard from "@/components/posts/PostCard";
import { getCahcedPosts } from "@/service/postService";

const containerStyle = {
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
} as const;

const mainStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
} as const;

const imageListStyle = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  padding: "32px",
  gap: "16px",
} as const;

export default async function Home() {
  const posts = await getCahcedPosts();
  const session = await getSession();
  const isLogin = Boolean(session.id);

  return (
    <div style={containerStyle}>
      <Header isLogin={isLogin} />
      <main style={mainStyle}>
        <Banner posts={posts} />
        <div style={imageListStyle}>
          {posts.map((post) => (
            <ImageCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      <AddButton />
      <Footer />
    </div>
  );
}