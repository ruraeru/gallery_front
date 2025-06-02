"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import fs from "fs/promises";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import path from "path";
import { z } from "zod";

const postSchema = z.object({
  title: z
    .string({
      required_error: "제목을 입력해주세요.",
    })
    .min(5, "사진의 제목을 5자 이상 입력해주세요."),
  description: z
    .string({
      required_error: "사진의 설명을 입력해주세요.",
    })
    .min(10, "사진의 설명을 10자 이상 입력해주세요."),
  photo: z.string({
    required_error: "사진을 넣어주세요",
  }),
});

export default async function uploadPost(_: unknown, formData: FormData) {
  const session = await getSession();
  if (!session.id) {
    return redirect("/login");
  } else {
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      photo: formData.get("photo"),
    };
    const userFolder = path.join(
      process.cwd(),
      "public",
      "images",
      "posts",
      session.id
    );
    let photoPath = "";
    if (data.photo instanceof File) {
      try {
        await fs.mkdir(userFolder, { recursive: true });

        const fileExtension = path.extname(data.photo.name);
        const fileName = `${Date.now()}-${session.id}${fileExtension}`;

        photoPath = path.join(userFolder, fileName);

        const photoData = await data.photo.arrayBuffer();
        await fs.writeFile(photoPath, Buffer.from(photoData));

        data.photo = `/images/posts/${session.id}/${fileName}`;
      } catch (err) {
        console.error("파일 저장 중 에러 : ", err);
        return {
          formErrors: ["파일 저장에 실패했습니다."],
          fieldErrors: {
            title: [],
            description: [],
          },
        };
      }
    }
    const result = postSchema.safeParse(data);
    if (!result.success) {
      return result.error.flatten();
    } else {
      const { title, description, photo } = result.data;
      if (session.id) {
        await db.post.create({
          data: {
            title,
            image: photo,
            description,
            user: {
              connect: {
                id: session.id,
              },
            },
          },
          select: {
            id: true,
          },
        });
        revalidateTag("un-allowed-posts");
        redirect("/");
      }
    }
  }
}
