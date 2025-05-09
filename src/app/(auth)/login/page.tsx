"use client";

import { useActionState } from "react";
import styled from "@emotion/styled";
import { login } from "./action";
import Input from "@/components/input";
import Button from "@/components/button";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const Contents = styled.div`
  padding: 32px;
  width: 70%;
  height: 480px;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  align-items: stretch;
  color: #1e293b;

  & h1 {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 16px;
    color: #4b5563;
  }
`;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  & label {
    font-size: 1rem;
    font-weight: 500;
    color: #374151;
  }

  & input {
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: #1e293b;
    background-color: #f9fafb;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  & span {
    color: red;
    font-size: 12px;
    font-weight: 500;
  }
`;

export default function Page() {
    const [state, action] = useActionState(login, null);
    return (
        <Container>
            <Contents>
                <h1>로그인</h1>
                <Wrapper action={action}>
                    <Input
                        name="user_id"
                        label="아이디"
                        type="text"
                        placeholder="아이디를 입력하세요"
                        required
                        errors={state?.fieldErrors?.user_id}
                    />
                    <Input
                        name="password"
                        label="비밀번호"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        required
                        errors={state?.fieldErrors?.password}
                    />
                    <Button text="로그인" />
                </Wrapper>
            </Contents>
        </Container>
    );
}