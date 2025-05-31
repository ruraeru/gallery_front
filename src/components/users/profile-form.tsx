"use client"

import { UserInfoType } from "@/service/userService";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useActionState, useEffect, useState, useRef } from "react";
import styles from "@/styles/ProfileEditForm.module.css";
import Input from "@/components/input";
import Button from "@/components/button";
import updateProfile from "@/app/(tabs)/users/[id]/edit/actions";
import Image from "next/image";

export default function ProfileForm({ user }: { user: UserInfoType }) {
    const [preview, setPreview] = useState<string | null>(user?.avatar || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user?.avatar) {
            setPreview(user.avatar);
        }
    }, [user?.avatar]);

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = e;
        if (!files || files.length === 0) return;
        const file = files[0];

        const allowedFileTypes = ["image/png", "image/jpeg", "image/webp", "image/heic"];
        if (!allowedFileTypes.includes(file.type)) {
            alert("업로드 가능한 파일 형식은 PNG, JPG, JPEG, WEBP, HEIC 입니다.");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert("파일 크기는 10MB를 초과할 수 없습니다.");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const [state, formAction] = useActionState(updateProfile, null);

    return (
        <div className={styles.profileFormRoot}>
            <div className={styles.avatarSection}>
                <div className={styles.avatarPreviewContainer}>
                    <Image
                        className={styles.avatarImage}
                        width={150}
                        height={150}
                        src={preview || "/default_avatar.png"}
                        alt="Profile Avatar Preview"
                        priority
                    />
                    <label htmlFor="avatar" className={styles.avatarEditLabel} title="프로필 사진 변경">
                        <PhotoIcon className={styles.avatarEditIcon} />
                    </label>
                </div>
                {state?.fieldErrors?.avatar && (
                    <p className={styles.formErrors}>{state.fieldErrors.avatar.join(", ")}</p>
                )}
            </div>

            {state?.formErrors && state.formErrors.length > 0 && !state.fieldErrors?.avatar && (
                <p className={styles.formErrors}>{state.formErrors.join(", ")}</p>
            )}

            <form action={formAction} className={styles.actualForm}>
                <input
                    ref={fileInputRef}
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg, image/webp, image/heic"
                    onChange={onImageChange}
                    className={styles.hiddenFileInput}
                />
                <Input
                    label="이름"
                    name="username"
                    type="text"
                    defaultValue={user?.username || ""}
                    placeholder="새 사용자 이름"
                    errors={state?.fieldErrors?.username}
                />
                <Input
                    label="새 비밀번호"
                    name="password"
                    type="password"
                    placeholder="새 비밀번호 입력"
                    errors={state?.fieldErrors?.password}
                />
                <Input
                    label="새 비밀번호 확인"
                    name="confirmPassword"
                    type="password"
                    placeholder="새 비밀번호 다시 입력"
                    errors={state?.fieldErrors?.confirmPassword}
                />
                <Button text="프로필 저장" />
            </form >
        </div >
    );
}