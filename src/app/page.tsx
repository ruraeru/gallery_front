import { getImages } from "@/lib/unsplash/getApi";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const getCahcedImages = nextCache(getImages, ["images"]);
  const images = await getCahcedImages();
  return (
    <div style={{

    }}>
      <header style={{
        height: "80px",
        backgroundColor: "gray",
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
      }}>
        <div>
          menu
        </div>
        <div>
          logo
        </div>
        <div style={{
          display: "flex", //헤더 디자인 중이었음 ㅇㅇ
          gap: "6px"
        }}>
          <div>
            Links
          </div>
          <div>
            login status
          </div>
        </div>
      </header>

      <main style={{
        minHeight: "100vh"
      }}>
        {/* Banner top3 images*/}
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            display: "flex",
          }}>
            {images.slice(0, 3).map((image) => {
              return (
                <Link href={`/photo/${image.id}`} key={image.id}>
                  <div key={image.id} style={{
                    position: "relative",
                  }}>
                    <Image style={{
                      objectFit: "cover",
                    }} src={image.urls.raw} width={480} height={480} priority alt="s" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* image list */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: "32px",
          gap: "16px",
          height: "240px"
        }}>
          {images.map((image) => (
            <Link href={`/photo/${image.id}`} key={image.id}>
              <div key={image.id} style={{
                position: "relative",
              }}>
                <Image style={{
                  objectFit: "cover",
                }} src={image.urls.regular} width={195} height={240} priority alt={image.alt_description} />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <footer style={{
        height: "80px",
        backgroundColor: "gray",
        width: "100%",
      }}>
        sddsa
      </footer>
    </div>
  );
}
