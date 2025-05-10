"use client";

import { useFormStatus } from "react-dom";
import styles from "@/styles/Button.module.css";

interface ButtonProps {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button className={styles.button} disabled={pending}>
            {pending ? "로딩 중" : text}
        </button>
    )
}