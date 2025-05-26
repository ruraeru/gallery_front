"use client";

import { logOut } from "@/app/(tabs)/(main)/actions";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { UserInfoType } from "@/service/userService";

type HeaderProps = {
  isLogin: boolean;
  userInfo: UserInfoType;
};

export default function Header({ isLogin, userInfo }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  console.log(userInfo);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.leftNav}>
            {/* 모바일 햄버거 버튼 */}
            <button
              className={styles.mobileMenuButton}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
            </button>
            <nav className={styles.desktopOnly}>
              <Link href="https://ruraeru.dothome.co.kr/hw.html" className={styles.navLink}>
                과제
              </Link>
            </nav>
          </div>

          <div className={styles.centerLogo}>
            <Link href={"/"} className={styles.logoLink} onClick={closeMobileMenu}>
              <Image
                src={"/logo.svg"}
                alt="사이트 로고"
                width={100}
                height={60}
                className={styles.logoImage}
                priority
              />
            </Link>
          </div>

          <div className={styles.rightActions}>
            <div className={`${styles.authContainer} ${styles.desktopOnly}`}>
              {isLogin ? (
                <>
                  <form action={logOut}>
                    <button type="submit" className={styles.logoutButton}>로그아웃</button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className={styles.authLink}>로그인</Link>
                  <Link href="/signup" className={styles.authLink}>회원가입</Link>
                </>
              )}
            </div>
            {isLogin && (
              <Link href={`/users/${userInfo?.id}`} className={`${styles.iconLink} ${!styles.desktopOnly ? '' : styles.mobileMyPageIconContainer}`} onClick={closeMobileMenu}>
                <Image
                  src={userInfo?.avatar || "/default_avatar.png"}
                  alt={`${userInfo?.username}'s profile avatar`}
                  width={100}
                  height={100}
                  priority
                />
                <span className={`${styles.myPageText} ${!styles.desktopOnly ? '' : styles.mobileMyPageTextHidden}`}>MY PAGE</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <nav className={`${styles.mobileNavMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <button onClick={closeMobileMenu} className={styles.closeMobileMenuButton}>
          <XMarkIcon width={24} />
        </button>
        <Link href="/" className={styles.navLink}>
          메인
        </Link>
        <Link href="https://ruraeru.dothome.co.kr/hw.html" className={styles.navLink}>
          과제
        </Link>
        <hr style={{ margin: '15px 0', borderColor: '#ddd', width: '80%' }} />
        {isLogin ? (
          <>
            <Link href={`/users/${userInfo?.id}`} className={styles.navLink} onClick={closeMobileMenu}>
              MY PAGE
            </Link>
            <form action={logOut} style={{ width: 'auto' }}>
              <button type="submit" className={styles.logoutButton} onClick={closeMobileMenu}>
                로그아웃
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.authLink} onClick={closeMobileMenu}>
              로그인
            </Link>
            <Link href="/signup" className={styles.authLink} onClick={closeMobileMenu}>
              회원가입
            </Link>
          </>
        )}
      </nav >
    </>
  );
}