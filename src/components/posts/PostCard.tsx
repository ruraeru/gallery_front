"use client";

import { Post } from "@/lib/getPosts";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const ImageCardContainer = styled.div`
  background-color: gray;
  padding: 12px;
  border-radius: 16px;
  width: 219px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 195px;
  height: 240px;
  overflow: hidden;
`;

const CardImage = styled(Image)`
  object-fit: cover;
  border-radius: 16px;
`;

const CardTitle = styled.p`
  margin-top: 8px;
  color: white;
  font-size: 1rem;
`;

const CardDescription = styled.p`
  color: #d1d5db;
  font-size: 0.875rem;
  margin-top: 4px;
`;

const CardUserLink = styled(Link)`
  color: #60a5fa;
  text-decoration: none;
  font-size: 0.875rem;
  margin-top: 4px;
  display: block;
  &:hover {
    text-decoration: underline;
  }
`;

function PostCardContent({ post }: { post: Post }) {
  return (
    <ImageCardContainer>
      <Link href={`/posts/${post?.id}`}>
        <ImageWrapper>
          <CardImage
            src={post?.image || ""}
            fill
            sizes="(max-width: 768px) 100vw, 195px"
            quality={90}
            alt={post?.title || ""}
          />
        </ImageWrapper>
      </Link>
      <CardTitle>{post?.title}</CardTitle>
      <CardDescription>{post?.description}</CardDescription>
      <CardUserLink href={`/users/${post?.userId}`}>@{post?.userId}</CardUserLink>
    </ImageCardContainer>
  );
}

export default function PostCard(props: { post: Post }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostCardContent {...props} />
    </Suspense>
  );
}