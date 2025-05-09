import Detail from "@/components/imageDtail";
import { getCachedPostByID } from "@/lib/getPosts";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getCachedPostByID(parseInt(id));
    if (!post) {
        return notFound();
    }
    return (
        <Detail url={post.image}>
            <h1 style={{
                fontSize: "50px"
            }}>{post.title}</h1>
            <div key={post.id} style={{
                position: "relative",
                placeItems: "center center",
                textAlign: "center",
                width: "420px",
                height: "630px"
            }}>
                <Image
                    style={{
                        objectFit: "cover",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
                    }}
                    src={post.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 195px"
                    quality={90}
                    alt={post.title}
                />
            </div>
            <h3 style={{
                fontSize: "32px"
            }}>Photo by</h3>
            <h3 style={{
                fontSize: "32px"
            }}>{post.userId}</h3>
        </Detail>
    )
}