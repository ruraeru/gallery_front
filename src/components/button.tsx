"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button className="button" disabled={pending}>
            {pending ? "로딩 중" : text}
        </button>
    )
}