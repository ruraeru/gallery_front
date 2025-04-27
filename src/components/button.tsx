"use client";

import { useFormStatus } from "react-dom";
import styled from '@emotion/styled';

interface ButtonProps {
    text: string;
}

const StyledButton = styled.button`
    height: 3rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    background-color: #0070f3;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #0051b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export default function Button({ text }: ButtonProps) {
    const { pending } = useFormStatus();
    return (
        <StyledButton disabled={pending}>
            {pending ? "로딩 중" : text}
        </StyledButton>
    )
}