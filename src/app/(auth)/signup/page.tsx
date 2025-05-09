"use client";

import { useActionState } from "react";
import styled from "@emotion/styled";
import { createAccount } from "./actions";
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
  width: 100%;
  max-width: 560px;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
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

  & button {
    background-color: #6366f1;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 1.125rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    &:hover {
      background-color: #4f46e5;
    }
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
`;

export default function Page() {
    const [state, action] = useActionState(createAccount, null);
    return (
        <Container>
            <Contents>
                <h1>회원가입</h1>
                <Wrapper action={action}>
                    <div>
                        <Input
                            label="아이디"
                            name="user_id"
                            type="text"
                            placeholder="아이디를 입력해주세요."
                            errors={state?.fieldErrors?.user_id}
                        />
                        <Input
                            label="이름"
                            name="username"
                            type="text"
                            placeholder="이름을 입력해주세요."
                            errors={state?.fieldErrors?.username}
                        />
                    </div>
                    <div>
                        <Input
                            label="패스워드"
                            name="password"
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            errors={state?.fieldErrors?.password}
                        />
                        <Input
                            label=""
                            name="confirmPassword"
                            type="password"
                            placeholder="비밀번호를 다시 한번 입력해주세요."
                            errors={state?.fieldErrors?.confirmPassword}
                        />
                    </div>
                    <Button text="로그인" />
                </Wrapper>
            </Contents>
        </Container>
    );
}