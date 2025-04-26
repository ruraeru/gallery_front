"use client";

import { useFormStatus } from "react-dom";
import styles from "../styles/button.module.css";

interface ButtonProps {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} className={styles.button}>
            {pending ? "로딩 중" : text}
        </button>
    )
}