"use client"

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useActionState, useState } from "react";
import styles from "./addProduct.module.css";
import uploadPost from "./actions";

export default function AddProduct() {
    const [preview, setPreview] = useState("");
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
    }
    const [state, action] = useActionState(uploadPost, null);
    return (
        <div className={styles.container}>
            <div>
                <label
                    htmlFor="photo"
                    className={`${styles.photoLabel} ${preview ? styles.hasPreview : ''}`}
                    style={{ backgroundImage: `url(${preview})` }}
                >
                    {!preview ? (
                        <div className={styles.photoPlaceholder}>
                            <PhotoIcon className={styles.photoIcon} />
                            <div className={styles.photoText}>
                                사진을 추가해주세요.
                            </div>
                        </div>
                    ) : null}
                </label>
                <p>*가로 이미지를 업로드 시 이미지가 짤릴 수 있어요!!</p>
            </div>
            <form action={action} className={styles.form}>
                <input
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/jpg,png,jpeg,HEIC"
                    className={styles.hiddenInput}
                    required
                />
                <Input
                    required
                    placeholder="제목"
                    type="text"
                    label="제목"
                    name="title"
                />
                <Input
                    type="text"
                    required
                    placeholder="자세한 설명"
                    name="description"
                    label="설명"
                />
                <Button text="작성 완료" />
            </form>
        </div>
    )
}