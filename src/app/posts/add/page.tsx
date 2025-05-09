"use client"

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useActionState, useState } from "react";

export default function AddProduct() {
    const [preview, setPreview] = useState("");
    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = e;
        if (!files) return;
        const file = files[0];

        const allowedFileTypes = ["png", "jpg", "jpeg"];
        if (allowedFileTypes.indexOf(file.type.split("/")[1]) === -1) {
            alert("file upload is only .png, .jpg, .jpeg");
            return;
        }
        if (file.size > 4000000) {
            alert("file is very big!!!!");
            return;
        }
        setPreview(URL.createObjectURL(file));
    }
    return (
        <div>
            <form className="flex flex-col gap-5 p-5">
                <label
                    htmlFor="photo"
                    className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed
                    cursor-pointer bg-center bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: `url(${preview})`
                    }}
                >
                    {!preview ? (
                        <>
                            <PhotoIcon className="w-20" />
                            <div className="text-neutral-400 text-sm">
                                사진을 추가해주세요.
                            </div>
                        </>
                    ) : null}
                </label>
                <input
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                    required
                />
                <Input
                    required
                    placeholder="제목"
                    type="text"
                    name="제목"
                    label="제목"
                />
                <Input
                    required
                    placeholder="가격"
                    type="number"
                    name="제목"
                    label="제목"
                />
                <Input
                    type="text"
                    required
                    placeholder="자세한 설명"
                    name="제목"
                    label="제목"
                />
                <Button text="작성 완료" />
            </form>
        </div>
    )
}