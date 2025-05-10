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

        const allowedFileTypes = ["png", "jpg", "jpeg", "HEIC"];
        if (allowedFileTypes.indexOf(file.type.split("/")[1]) === -1) {
            alert("file upload is only .png, .jpg, .jpeg .HEIC");
            return;
        }
        if (file.size > 4000000) {
            alert("file is very big!!!!");
            return;
        }
        setPreview(URL.createObjectURL(file));
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
                    accept="image/*"
                    onChange={onImageChange}
                    className={styles.hiddenInput}
                />
                <Button text="업로드" />
            </form>
        </div>
    );
}