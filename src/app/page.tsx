import { getImages } from "@/lib/unsplash/getApi";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const getCahcedImages = nextCache(getImages, ["images"]);
  const images = await getCahcedImages();
  return (
    <div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "32px",
        placeItems: "center"
      }}>
        {images.map((image) => (
          <Link href={`/photo/${image.id}`} key={image.id}>
            <div key={image.id} style={{
              position: "relative",
              placeItems: "center center"
            }}>
              <Image style={{
                objectFit: "cover",
                margin: "0 auto",
              }} src={image.urls.regular} width={160} height={240} priority alt="s" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
