"use client"

import { HTMLAttributes, ReactNode } from "react";
import styles from "@/styles/ImageDetail.module.css";

export default function Detail({ children, url, ...rest }: { children: ReactNode, url: string } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={styles.wrapper} {...rest}>
            <div
                className={styles.blurDiv}
                style={{ backgroundImage: `url(${url})` }}
            />
            <div className={styles.noneBlurDiv}>
                {children}
            </div>
        </div>
    )
}