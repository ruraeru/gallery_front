import styles from "./signup.module.css";

export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                <h1>회원가입</h1>
                <form className={styles.wrapper}>
                    <div>
                        <label htmlFor="username">아이디</label>
                        <input type="text" id="username" name="username" placeholder="아이디를 입력하세요" />
                        {/* <span>{state?.fieldErrors.username}</span> */}
                    </div>
                    <div>
                        <label htmlFor="password">패스워드</label>
                        <input type="password" id="password" name="password" placeholder="패스워드를 입력하세요" />
                    </div>
                    <button type="submit">로그인</button>
                </form>
            </div>
        </div>
    )
}