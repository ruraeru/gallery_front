"use client";

import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import styles from "@/styles/AddButton.module.css";

export default function AddButton() {
  return (
    <div className={styles.iconContainer}>
      <Link href="/posts/add">
        <PlusCircleIcon className={styles.icon} />
      </Link>
    </div>
  );
}