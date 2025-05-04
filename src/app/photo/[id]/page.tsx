import Button from "@/components/button";
import { getCahcedImageByID } from "@/lib/unsplash/getApi";
import Image from "next/image";
// import styled from '@emotion/styled';

// const Wrapper = styled.div`
//     width: 100vw;

// `;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const image = await getCahcedImageByID(id);
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: `no-repeat center/100% url(${image.urls.full})`,
            backdropFilter: "blur(20px)",
        }}>
            <Button text="123" />
            <div key={image.id} style={{
                position: "relative",
                placeItems: "center center",
                textAlign: "center",
                filter: "none",
            }}>
                <Image style={{
                    objectFit: "cover",
                }} src={image.urls.raw} width={420} height={630} priority alt="s" />
            </div>
        </div>
    )
}