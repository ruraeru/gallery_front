"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import path from "path";
import { z } from "zod";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  photo: z.string(),
});

export default async function uploadPost(_: unknown, formData: FormData) {
  const session = await getSession();
  if (!session.id) {
    alert("로그인 후 진행해 주세요.");
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
        const fileName = `${Date.now()}-${data.title}${fileExtension}`;

        photoPath = path.join(userFolder, fileName);

        const photoData = await data.photo.arrayBuffer();
        await fs.writeFile(photoPath, Buffer.from(photoData));

        data.photo = `/images/${session.id}/${fileName}`;
      } catch (err) {
        console.error("파일 저장 중 에러 : ", err);
        return {
          formErrors: ["파일 저장에 실패했습니다."],
        };
      }
    }
    const result = postSchema.safeParse(data);
    if (!result.success) {
      return result.error.flatten();
    } else {
      const { title, description, photo } = result.data;
      if (session.id) {
        const post = await db.post.create({
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
        console.log(post);
        //   revalidatePath("/");
        redirect("/");
      }
    }
  }
}
