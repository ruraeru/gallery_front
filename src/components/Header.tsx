"use client";

import { logOut } from "@/app/(tabs)/(main)/actions";
import Link from "next/link";
import styles from "@/styles/Header.module.css";

type HeaderProps = {
  isLogin: boolean;
};

export default function Header({ isLogin }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.menu}>menu</div>
      <div className={styles.title}>모두의 갤러리</div>
      <div className={styles.auth}>
        {!isLogin ? (
          <div>
            <Link href="/login" className={styles.link}>login</Link>
            <Link href="/signup" className={styles.link}>signup</Link>
          </div>
        ) : (
          <form action={logOut}>
            <button className={styles.logoutButton}>logout</button>
          </form>
        )}
      </div>
    </header>
  );
}