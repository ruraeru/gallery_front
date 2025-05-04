"use client"

import styled from '@emotion/styled';
import { HTMLAttributes, ReactNode } from "react";

const Wrapper = styled.div<{ $url: string }>`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: black;
    overflow: hidden;

    color: white;

    * {
        font-family: "Pretendard-Regular";
    }
`;

const BlurDiv = styled.div<{ $url: string }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: no-repeat center/cover url(${props => props.$url});
    filter: blur(10px);
    opacity: 0.8;
    z-index: 1;
`;

const NoneBlurDiv = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function Detail({ children, url, ...rest }: { children: ReactNode, url: string } & HTMLAttributes<HTMLDivElement>) {
    return (
        <Wrapper $url={url} {...rest}>
            <BlurDiv $url={url} />
            <NoneBlurDiv>
                {children}
            </NoneBlurDiv>
        </Wrapper>
    )
}