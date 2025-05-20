"use client";

import { useActionState } from "react";
import { login } from "./action";
import Input from "@/components/input";
import styles from "@/styles/Auth.module.css";
import Button from "@/components/button";

export default function Page() {
  const [state, action] = useActionState(login, null);
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h1>로그인</h1>
        <form className={styles.wrapper} action={action}>
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
        </form>
      </div>
    </div>
  );
}