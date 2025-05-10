"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useActionState, useState } from "react";
import styled from "@emotion/styled";
import uploadPost from "./actions";

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  height: 100vh;
  justify-content: space-around;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem;
`;

const PhotoLabel = styled.label<{ hasPreview: boolean }>`
  width: 450px;
  height: 600px;
  border: 2px dashed black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${(props) =>
        props.hasPreview &&
        `
      border-style: solid;
    `}
`;

const PhotoPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(PhotoIcon)`
  width: 5rem;
  height: 5rem;
`;

const PhotoText = styled.div`
  color: #9ca3af;
  font-size: 0.875rem;
  text-align: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

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
        <Container>
            <div>
                <PhotoLabel
                    htmlFor="photo"
                    hasPreview={!!preview}
                    style={{ backgroundImage: `url(${preview ? preview : ""})` }}
                >
                    {!preview ? (
                        <PhotoPlaceholder>
                            <Icon />
                            <PhotoText>사진을 추가해주세요.</PhotoText>
                        </PhotoPlaceholder>
                    ) : null}
                </PhotoLabel>
                <p>*가로 이미지를 업로드 시 이미지가 짤릴 수 있어요!!</p>
                <p>{state?.formErrors}</p>
            </div>
            <Form action={action}>
                <HiddenInput
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    required
                />
                <Input
                    required
                    placeholder="제목"
                    type="text"
                    label="제목"
                    name="title"
                    errors={state?.fieldErrors.title}
                />
                <Input
                    type="text"
                    required
                    placeholder="자세한 설명"
                    name="description"
                    label="설명"
                    errors={state?.fieldErrors.description}
                />
                <Button text="작성 완료" />
            </Form>
        </Container>
    );
}