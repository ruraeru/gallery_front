import Detail from "@/components/imageDtail";
import { getCahcedImageByID } from "@/lib/unsplash/getApi";
import Image from "next/image";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const image = await getCahcedImageByID(id);
    return (
        <Detail url={image.urls.full}>
            <h1 style={{
                fontSize: "50px"
            }}>HANGANG RIVER</h1>
            <div key={image.id} style={{
                position: "relative",
                placeItems: "center center",
                textAlign: "center",
            }}>
                <Image style={{
                    objectFit: "cover",
                    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
                }} src={image.urls.raw} width={420} height={630} priority alt="s" />
            </div>
            <h3 style={{
                fontSize: "32px"
            }}>Photo by</h3>
            <h3 style={{
                fontSize: "32px"
            }}>JENNILEE MARIGOMEN</h3>
        </Detail>
    )
}