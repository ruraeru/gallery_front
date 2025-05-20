"use server";
import fs from "fs/promises";
import bcrypt from "bcrypt";
import { updateProfileFormSchema, signUpFormSchema } from "@/lib/schema";
import getSession from "@/lib/session";
import path from "path";
import db from "@/lib/db";
import { logOut } from "@/app/(tabs)/(main)/actions";

export default async function updateProfile(_: unknown, formData: FormData) {
  const session = await getSession();
  const data = {
    // user_id: session.id,
    avatar: formData.get("avatar"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  if (data.avatar instanceof File) {
    const currentUser = await db.user.findUnique({
      where: { id: session.id },
      select: { avatar: true },
    });

    if (currentUser?.avatar) {
      const oldAvatarURL = currentUser.avatar;
      const oldAvatarFileName = path.basename(oldAvatarURL);

      const oldAvatarFsPath = path.join(
        process.cwd(),
        "public",
        "images",
        "avatar",
        session.id,
        oldAvatarFileName
      );
      try {
        await fs.unlink(oldAvatarFsPath); //기존 프로필 이미지 삭제
        console.log(`기존 아바타 파일 삭제 완료 : ${oldAvatarFsPath}`);
      } catch (err: any) {
        if (err.code !== "ENOENT") {
          console.error(
            `기존 아바타 파일 삭제 중 에러 발생 : ${oldAvatarFsPath}`,
            err
          );
        } else {
          console.log(
            `기존 아바타 파일이 존재하지 않아 삭제하지 않음 : ${oldAvatarFsPath}`
          );
        }
      }

      const userFolder = path.join(
        process.cwd(),
        "public",
        "images",
        "avatar",
        session.id
      );
      try {
        await fs.mkdir(userFolder, { recursive: true }); //사용자 폴더가 존재하지 않다면 생성

        const fileExtension = path.extname(data.avatar.name);

        const fileName = `${session.id}_profile_${Date.now()}${fileExtension}`; //파일 이름 설정

        const photoPath = path.join(userFolder, fileName); //파일 저장 경로

        const photoData = await data.avatar.arrayBuffer();
        await fs.writeFile(photoPath, Buffer.from(photoData));

        data.avatar = `/images/avatar/${session.id}/${fileName}`; //이미지 URL
      } catch (err) {
        console.error("아바타 업로드 중 에러 : ", err);
        return {
          formErrors: ["파일 저장에 실패했습니다."],
          fieldErrors: {
            username: [],
            password: [],
            confirmPassword: [],
          },
        };
      }
    } else {
      const currentUser = await db.user.findUnique({
        where: { id: session.id },
        select: { avatar: true },
      });
      data.avatar = currentUser?.avatar || "";
    }

    const validationData = {
      ...data,
      avatar: data.avatar,
    };

    const result = updateProfileFormSchema.safeParse(validationData);

    if (!result.success) {
      return result.error.flatten();
    } else {
      if (session.id) {
        const updatePayload: {
          username: string;
          password: string;
          avatar?: string | null;
        } = {
          username: result.data.username,
          password: await bcrypt.hash(result.data.password, 12),
        };

        if (data.avatar) {
          updatePayload.avatar = data.avatar;
        } else if (result.data.avatar === "") {
          updatePayload.avatar = null;
        }
        await db.user.update({
          where: {
            id: session.id,
          },
          data: updatePayload,
        });
        // await logOut(); //프로필 수정 성공 시 logout 시키고 메인으로 보냄
      }
    }
  }
}
