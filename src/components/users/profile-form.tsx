"use client"

import { UserInfoType } from "@/service/userService";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import styles from "@/styles/AddPost.module.css";
import Input from "../input";
import updateProfile from "@/app/(tabs)/users/[id]/edit/actions";
import Button from "../button";
import Image from "next/image";

export default function ProfileForm({ user }: { user: UserInfoType }) {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        console.log(user?.avatar)
        if (user?.avatar) {
            setPreview(user?.avatar);
        }
    }, [user]);
    const [value, setValue] = useState(user?.username);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = e;
        if (!files) return;
        const file = files[0];

        const allowedFileTypes = ["png", "jpg", "jpeg", "HEIC", "webp"];
        if (allowedFileTypes.indexOf(file.type.split("/")[1]) === -1) {
            alert("file upload is only .png, .jpg, .jpeg .HEIC .webp");
            return;
        }
        if (file.size > 4000000) {
            alert("file is very big!!!!");
            return;
        }
        setPreview(URL.createObjectURL(file));
    };

    const [state, aciton] = useActionState(updateProfile, null);
    return (
        <div style={{
            width: "100%",
            // maxWidth: "1200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div>
                <Image
                    style={{
                        borderRadius: "50%",
                        position: "absolute",
                        border: "4px solid black",
                        objectFit: "cover",
                        zIndex: -999,
                    }}
                    width={133}
                    height={133}
                    src={user?.avatar || "/null"}
                    alt=""
                />
                <label
                    htmlFor="avatar"
                    className={`${styles.photoLabel} ${preview ? styles.hasPreview : ''}`}
                    style={{
                        backgroundImage: `url(${preview ? preview : ""})`,
                        width: "133px",
                        height: "133px",
                        borderRadius: "50%"
                    }}
                >
                    {!preview ? (
                        <div className={styles.photoPlaceholder}>
                            <PhotoIcon className={styles.icon} />
                        </div>
                    ) : null}
                </label>
                <p>{state?.formErrors}</p>
            </div>
            <form action={aciton} className={styles.form}>
                <input
                    style={{
                        display: "none"
                    }}
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={onImageChange}
                />
                <Input
                    label="이름"
                    name="username"
                    type="text"
                    placeholder={value}
                    // value={value}
                    onChange={onChange}
                    errors={state?.fieldErrors.username}
                />
                <Input
                    label="비밀번호"
                    name="password"
                    type="password"
                    placeholder="비밀번호 입력"
                    errors={state?.fieldErrors.password}
                />
                <Input
                    label="비밀번호 확인"
                    name="confirmPassword"
                    type="password"
                    placeholder="비밀번호 다시 입력"
                    errors={state?.fieldErrors.confirmPassword}
                />
                <Button text="수정 하기" />
            </form>
        </div>
    )
}