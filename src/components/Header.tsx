"use client";

import { logOut } from "@/app/(tabs)/(main)/actions";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
import Image from "next/image";

type HeaderProps = {
  isLogin: boolean;
};

export default function Header({ isLogin }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <Link href="https://ruraeru.dothome.co.kr/hw.html">
          과제
        </Link>
      </div>
      <div>
        <Link href={"/"}>
          <Image src={"/logo.svg"} alt="모아통 로고 이미지" width={200} height={80} />
        </Link>
      </div>
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