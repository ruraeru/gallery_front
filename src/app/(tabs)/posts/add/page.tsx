"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useActionState, useState } from "react";
import uploadPost from "./actions";
import styles from "@/styles/AddPost.module.css";

export default function AddProduct() {
    const [preview, setPreview] = useState<string | null>(null);
    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = e;
        if (!files) return;
        const file = files[0];

        const allowedFileTypes = ["image/png", "image/jpeg", "image/webp", "image/heic"];
        if (!allowedFileTypes.includes(file.type)) {
            alert("업로드 가능한 파일 형식은 PNG, JPG, JPEG, WEBP, HEIC 입니다.");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert("파일 크기는 10MB를 초과할 수 없습니다.");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const [state, action] = useActionState(uploadPost, null);
    return (
        <div className={styles.container}>
            <div>
                <label
                    htmlFor="photo"
                    className={`${styles.photoLabel} ${preview ? styles.hasPreview : ''}`}
                    style={{ backgroundImage: `url(${preview ? preview : ""})` }}
                >
                    {!preview ? (
                        <div className={styles.photoPlaceholder}>
                            <PhotoIcon className={styles.icon} />
                            <div className={styles.photoText}>사진을 추가해주세요.</div>
                        </div>
                    ) : null}
                </label>
                <p>*가로 이미지를 업로드 시 이미지가 짤릴 수 있어요!!</p>
                <p>{state?.formErrors}</p>
            </div>
            <form className={styles.form} action={action}>
                <Input
                    label="제목"
                    name="title"
                    type="text"
                    placeholder="제목을 입력해주세요."
                    errors={state?.fieldErrors?.title}
                />
                <Input
                    label="설명"
                    name="description"
                    type="text"
                    placeholder="설명을 입력해주세요."
                    errors={state?.fieldErrors?.description}
                />
                <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/png, image/jpeg, image/webp, image/heic"
                    onChange={onImageChange}
                    className={styles.hiddenInput}
                />
                <Button text="업로드" />
            </form>
        </div>
    );
}