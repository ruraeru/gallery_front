"use client";

import { Post } from "@/lib/getPosts";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const BannerImages = styled.div`
  display: flex;
  gap: 16px;
  min-width: 0;
`;

const BannerImageWrapper = styled.div`
  position: relative;
  width: 360px;
  height: 360px;
  flex-shrink: 0;
`;

const BannerImage = styled(Image)`
  object-fit: cover;
  border-radius: 8px;
`;

type BannerProps = {
  posts: Post[];
};

function BannerContent({ posts }: BannerProps) {
  return (
    <BannerContainer>
      <BannerImages>
        {posts.slice(0, 3).map((post) => (
          <Link href={`/posts/${post?.id}`} key={post?.id}>
            <BannerImageWrapper>
              <BannerImage
                src={post?.image || ""}
                fill
                sizes="360px"
                priority
                quality={90}
                alt={post?.title || ""}
              />
            </BannerImageWrapper>
          </Link>
        ))}
      </BannerImages>
    </BannerContainer>
  );
}

export default function Banner(props: BannerProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BannerContent {...props} />
    </Suspense>
  );
}