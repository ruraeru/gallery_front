"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const IconContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 90%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const Icon = styled(PlusCircleIcon)`
  width: 64px;
  height: 64px;
  color: #000;
`;

export default function AddButton() {
    return (
        <IconContainer>
            <Link href="/posts/add">
                <Icon />
            </Link>
        </IconContainer>
    );
}