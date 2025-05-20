"use client";

import { useActionState } from "react";
import { createAccount } from "./actions";
import Input from "@/components/input";
import Button from "@/components/button";
import styles from "@/styles/Auth.module.css";

export default function Page() {
  const [state, action] = useActionState(createAccount, null);
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h1>회원가입</h1>
        <form className={styles.wrapper} action={action}>
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
        </form>
      </div>
    </div>
  );
}