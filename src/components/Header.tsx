"use client";

import { logOut } from "@/app/actions";
import styled from "@emotion/styled";
import Link from "next/link";

const HeaderContainer = styled.header`
  height: 80px;
  background-color: gray;
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

const HeaderMenu = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
`;

const HeaderAuth = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const AuthLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
`;

type HeaderProps = {
    isLogin: boolean;
};

export default function Header({ isLogin }: HeaderProps) {
    return (
        <HeaderContainer>
            <HeaderMenu>menu</HeaderMenu>
            <HeaderTitle>모두의 갤러리</HeaderTitle>
            <HeaderAuth>
                {!isLogin ? (
                    <div>
                        <AuthLink href="/login">login</AuthLink>
                        <AuthLink href="/signup">signup</AuthLink>
                    </div>
                ) : (
                    <form action={logOut}>
                        <LogoutButton>logout</LogoutButton>
                    </form>
                )}
            </HeaderAuth>
        </HeaderContainer>
    );
}