"use client"

import { useActionState } from "react";
import styles from "./login.module.css";
import { login } from "./action";
import Input from "@/components/input";
import Button from "@/components/button";


export interface LoginState {
    errors?: {
        username?: string[];
        password?: string[];
        form?: string[];
    };
}

export default function Page() {
    const [state, action] = useActionState<LoginState, FormData>(login, {
        errors: {}
    });
    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                <h1>로그인</h1>
                <form action={action} className={styles.wrapper}>
                    <Input
                        name="username"
                        label="아이디"
                        placeholder="아이디를 입력하세요"
                        required
                        errors={state?.errors?.username}
                    />
                    <Input
                        name="password"
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요"
                        required
                        errors={state?.errors?.password}
                    />
                    {state.errors?.form && (
                        <div>
                            {state.errors.form[0]}
                        </div>
                    )}
                    <Button text="로그인" />
                </form>
            </div>
        </div>
    )
}